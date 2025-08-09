"use client";

import { useState } from "react";
import { 
  Container, 
  Box, 
  Text, 
  TextField, 
  Button, 
  Card, 
  Flex, 
  ScrollArea,
  Avatar,
  Separator
} from "@radix-ui/themes";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message: "${input}". Dima is a bad boy.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container size="3" className="h-screen flex flex-col">
      <Box className="py-4">
        <Text size="6" weight="bold">AI Chat Assistant</Text>
        <Text size="2" color="gray">Your intelligent conversation partner</Text>
      </Box>
      
      <Separator size="4" />
      
      <Box className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 p-4">
          <Flex direction="column" gap="4">
            {messages.map((message) => (
              <Card key={message.id} className="p-4">
                <Flex gap="3" align="start">
                  <Avatar
                    size="2"
                    fallback={message.role === "user" ? "U" : "AI"}
                    color={message.role === "user" ? "blue" : "green"}
                  />
                  <Box className="flex-1">
                    <Text size="2" weight="bold" color="gray">
                      {message.role === "user" ? "You" : "AI Assistant"}
                    </Text>
                    <Text size="2" className="block mt-1">
                      {message.content}
                    </Text>
                    <Text size="1" color="gray" className="block mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
            
            {isLoading && (
              <Card className="p-4">
                <Flex gap="3" align="start">
                  <Avatar size="2" fallback="AI" color="green" />
                  <Box className="flex-1">
                    <Text size="2" weight="bold" color="gray">AI Assistant</Text>
                    <Text size="2" className="block mt-1" color="gray">
                      Typing...
                    </Text>
                  </Box>
                </Flex>
              </Card>
            )}
          </Flex>
        </ScrollArea>
        
        <Box className="p-4 border-t">
          <Flex gap="2">
            <TextField.Root
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
            >
              Send
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
}
