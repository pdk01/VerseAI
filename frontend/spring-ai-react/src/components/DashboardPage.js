// import React from 'react';
// import { Button, Typography, Grid, Box } from '@mui/material';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom'; 

// function DashboardPage() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Box sx={{ textAlign: 'center', marginTop: 5 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to VersaAI Dashboard
//         </Typography>
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link} 
//               to="/image-generator"
//             >
//               Generate Images
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link} 
//               to="/recipe-generator"
//             >
//               Create Recipe
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link} // Using Link to navigate to the Ask AI page
//               to="/chat"
//             >
//               Ask AI
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </motion.div>
//   );
// }

// export default DashboardPage;
