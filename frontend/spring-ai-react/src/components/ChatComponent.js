import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Snackbar, Alert, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ChatComponent() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]); // { role: 'user'|'ai', text: string }[]
  const [isLoading, setIsLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const askAI = async () => {
    if (!prompt.trim()) return;
    const userMsg = { role: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8081/ask-ai?prompt=${encodeURIComponent(userMsg.text)}`);
      const data = await response.text();
      setMessages((prev) => [...prev, { role: 'ai', text: data }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setSnack({ open: true, message: 'Failed to get AI response', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnack({ open: true, message: 'Copied to clipboard', severity: 'success' });
    } catch {
      setSnack({ open: true, message: 'Copy failed', severity: 'error' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Paper elevation={4} sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>Talk to AI</Typography>

        <div className="chat-container">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.role === 'user' ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <div className={`bubble ${m.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                {m.text}
                {m.role === 'ai' && (
                  <IconButton
                    size="small"
                    onClick={() => copyText(m.text)}
                    sx={{ float: 'right', ml: 1, color: 'inherit', opacity: 0.8 }}
                  >
                    <ContentCopyIcon fontSize="inherit" />
                  </IconButton>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="bubble bubble-ai" style={{ opacity: 0.8 }}>
              <motion.span
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              >
                AI is typing…
              </motion.span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Ask me anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askAI()}
          />
          <Button variant="contained" onClick={askAI}>Send</Button>
          <Button variant="outlined" color="secondary" onClick={clearChat}>Clear</Button>
        </Box>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default ChatComponent;
