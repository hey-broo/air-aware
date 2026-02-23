import { useState, useRef, useEffect } from "react";
import { Bot, Send, Clock, Lightbulb, Loader2, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import type { City, ZoneData } from "@/data/mockData";

interface AIChatPanelProps {
  city: City;
  zones: ZoneData[];
  mode?: "admin" | "user";
}

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const AIChatPanel = ({ city, zones, mode = "admin" }: AIChatPanelProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [city.id]);

  const buildContext = () => {
    const topZones = zones.slice(0, 5).map(z => `${z.name}: AQI ${z.aqi} (${z.trend}, ${z.mainPollutant})`).join("; ");
    return `[City: ${city.name}, State: ${city.state}, Current AQI: ${city.aqi}, Population: ${city.population}. Top zones: ${topZones}]`;
  };

  const getSystemOverride = () => {
    if (mode === "admin") {
      return "\n\nIMPORTANT: Respond ONLY with short bullet points. Structure:\n- **Past Precautions**: 2-3 bullets on what was tried\n- **Why They Failed**: 2-3 bullets\n- **What Should Be Done**: 2-3 actionable bullets\nKeep each bullet under 15 words. Be location-specific.";
    }
    return "\n\nIMPORTANT: Respond in simple, non-technical language. Give a short meaningful summary (3-5 sentences max). Use everyday words. No technical jargon. Be helpful and reassuring.";
  };

  const streamChat = async (allMessages: Msg[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: getSystemOverride() },
          ...allMessages,
        ],
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ error: "Request failed" }));
      throw new Error(err.error || `Error ${resp.status}`);
    }
    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantSoFar = "";

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      const content = assistantSoFar;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content } : m);
        }
        return [...prev, { role: "assistant", content }];
      });
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") return;
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) upsert(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
  };

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const contextMsg = buildContext();
    const userMsg: Msg = { role: "user", content: `${contextMsg}\n\n${text}` };
    const displayMsg: Msg = { role: "user", content: text };

    setMessages(prev => [...prev, displayMsg]);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat([...messages.map(m => m.role === "user" ? { ...m, content: `${contextMsg}\n\n${m.content}` } : m), userMsg]);
    } catch (e: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `⚠️ Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickAction = (prompt: string) => send(prompt);

  // Toggle button when closed
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[90vw]">
      <div className="flex flex-col h-[500px] shadow-2xl border border-border rounded-xl bg-background/60 backdrop-blur-xl">
        {/* Header with close */}
        <div className="p-3 border-b border-border/50 flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {mode === "admin" ? "AI Pollution Analyst" : "Air Quality Helper"}
          </span>
          <span className="text-xs text-muted-foreground ml-auto mr-2">{city.name}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick actions */}
        {mode === "admin" ? (
          <div className="p-2 border-b border-border/30 flex flex-wrap gap-1.5">
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => quickAction(`Predict pollution levels for ${city.name} in the next 6 hours.`)}>
              <Clock className="w-3 h-3" /> 6h Forecast
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => quickAction(`Predict pollution levels for ${city.name} in the next 12 hours.`)}>
              <Clock className="w-3 h-3" /> 12h Forecast
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => quickAction(`For ${city.name}: What past precautions were taken for pollution? Why did they fail? What should be done next?`)}>
              <Lightbulb className="w-3 h-3" /> Policy Insights
            </Button>
          </div>
        ) : (
          <div className="p-2 border-b border-border/30 flex flex-wrap gap-1.5">
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => quickAction(`How is the air quality in ${city.name} right now? Is it safe to go outside?`)}>
              🌤 Air Quality
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => quickAction(`What health precautions should I take in ${city.name} today?`)}>
              💊 Health Tips
            </Button>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 p-3" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-xs py-8 space-y-2">
              <Bot className="w-8 h-8 mx-auto opacity-30" />
              <p>{mode === "admin"
                ? `Ask about pollution predictions or policy insights for ${city.name}.`
                : `Ask anything about air quality in ${city.name}. We'll keep it simple!`
              }</p>
            </div>
          )}
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/70 text-foreground"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>p]:mb-2 [&>h3]:font-bold [&>h3]:mb-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-secondary/70 rounded-lg px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" /> Analyzing...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-2 border-t border-border/50 flex gap-2">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask about ${city.name}...`}
            className="min-h-[40px] max-h-[80px] resize-none text-sm bg-secondary/30"
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
          />
          <Button size="icon" onClick={() => send(input)} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;
