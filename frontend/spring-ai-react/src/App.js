import React, { useContext } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeContext } from './ThemeContext';

import ImageGenerator from './components/ImageGenerator';
import ChatComponent from './components/ChatComponent';
import RecipeGenerator from './components/RecipeGenerator';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  const Section = ({ id, children }) => (
    <section id={id} className="section">
      <div className="section-inner">{children}</div>
    </section>
  );

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* HERO */}
      <header className="hero" id="home">
        {/* animated gradient blobs */}
        <motion.div
          className="blob blob-1"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        <motion.div
          className="blob blob-2"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Typography component="h1" variant="h2">
            Build with AI. Launch like a startup.
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Images. Chat. Recipes. One modern interface.
          </Typography>
          <div className="hero-cta">
            <Button href="#features" size="large" variant="contained" sx={{ borderRadius: '999px', px: 3 }}>
              Explore Features
            </Button>
            <Button href="#images" size="large" variant="outlined" sx={{ borderRadius: '999px', px: 3 }}>
              Try Now
            </Button>
          </div>
        </Container>
      </header>

      {/* FEATURES */}
      <Section id="features">
        <div className="features">
          <a className="feature-card" href="#images">
            <Typography variant="h5" sx={{ mb: 1 }}>🖼️ Image Generator</Typography>
            <Typography variant="body2">Create striking visuals from prompts.</Typography>
          </a>
          <a className="feature-card" href="#chat">
            <Typography variant="h5" sx={{ mb: 1 }}>💬 Ask AI</Typography>
            <Typography variant="body2">Converse with contextual intelligence.</Typography>
          </a>
          <a className="feature-card" href="#recipes">
            <Typography variant="h5" sx={{ mb: 1 }}>🍳 Recipe Creator</Typography>
            <Typography variant="body2">Turn ingredients into delicious dishes.</Typography>
          </a>
        </div>
      </Section>

      {/* SECTIONS */}
      <Section id="images">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Image Studio</Typography>
        <ImageGenerator />
      </Section>

      <Section id="chat">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Conversational AI</Typography>
        <ChatComponent />
      </Section>

      <Section id="recipes">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Recipe Creator</Typography>
        <RecipeGenerator />
      </Section>

      {/* Footer */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="body2">⚡ Built with Spring Boot + React + AI</Typography>
      </Box>

      {/* Floating theme toggle */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default App;
