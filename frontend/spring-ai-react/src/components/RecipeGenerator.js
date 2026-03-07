import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [recipe, setRecipe] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });

  const createRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/recipe-creator?ingredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}`
      );
      const data = await response.text();
      setRecipe(data);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setSnack({ open: true, message: 'Failed to generate recipe', severity: 'error' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <div className="recipe-grid">
        {/* Left: inputs */}
        <Paper elevation={4} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Create a Recipe</Typography>
          <TextField
            fullWidth
            variant="outlined"
            label={`Ingredients (comma separated) (${ingredients.length}/200)`}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label={`Cuisine (${cuisine.length}/50)`}
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label={`Dietary Restrictions (${dietaryRestrictions.length}/100)`}
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={createRecipe}>Create Recipe</Button>
        </Paper>

        {/* Right: live preview */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper elevation={4} sx={{ p: 3, minHeight: 240 }}>
            <Typography variant="h6" gutterBottom>Preview</Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap', opacity: recipe ? 1 : 0.6 }}>
              {recipe || 'Your generated recipe will appear here...'}
            </Typography>
          </Paper>
        </motion.div>
      </div>

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

export default RecipeGenerator;
