import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Box, IconButton, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });

  const generateImages = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/generate-images?prompt=${encodeURIComponent(prompt)}`);
      const data = await response.json();
      setImageUrls(data.imageUrls || []);
    } catch (error) {
      console.error('Error generating images:', error);
      setSnack({ open: true, message: 'Failed to generate images', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const breakpointColumns = { default: 3, 1100: 3, 700: 2, 500: 1 };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter prompt for images"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generateImages()}
        />
        <Button variant="contained" onClick={generateImages}>Generate</Button>
      </Box>

      {/* Loading state */}
      {isLoading && (
        <>
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />
          <div className="masonry-grid">
            <div className="masonry-grid_column" style={{ width: '100%' }}>
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          </div>
        </>
      )}

      {!isLoading && imageUrls.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {imageUrls.map((url, index) => (
            <motion.div key={index} whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
              <div className="image-tile">
                <img src={url} alt={`Generated-${index}`} />
                <div className="image-actions">
                  <IconButton sx={{ color: '#fff' }} onClick={() => window.open(url, '_blank')}>
                    <ZoomInIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: '#fff' }}
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `ai-image-${index}.png`;
                      a.click();
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      )}

      {!isLoading && imageUrls.length === 0 && (
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Tip: Try “a cinematic portrait, shallow depth of field, volumetric lighting”
        </Typography>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
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

export default ImageGenerator;