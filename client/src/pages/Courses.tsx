import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  TextField,
  MenuItem,
} from '@mui/material';
import { coursesAPI } from '../services/api';

interface Course {
  id: number;
  title: string;
  description: string;
  type: string;
  level: string;
  duration: string;
  imageUrl: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    type: 'all',
    level: 'all',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesAPI.getAllCourses();
        setCourses(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (filter.type !== 'all' && course.type !== filter.type) return false;
    if (filter.level !== 'all' && course.level !== filter.level) return false;
    return true;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courses
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Course Type"
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="forex">Forex</MenuItem>
              <MenuItem value="derivatives">Derivatives</MenuItem>
              <MenuItem value="basics">Basics</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Difficulty Level"
              value={filter.level}
              onChange={(e) => setFilter({ ...filter, level: e.target.value })}
            >
              <MenuItem value="all">All Levels</MenuItem>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {filteredCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.imageUrl || '/course-placeholder.jpg'}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={course.type} 
                    sx={{ mr: 1, mb: 1 }}
                    color="primary"
                    size="small"
                  />
                  <Chip 
                    label={course.level} 
                    sx={{ mr: 1, mb: 1 }}
                    color="secondary"
                    size="small"
                  />
                  <Chip 
                    label={course.duration} 
                    sx={{ mb: 1 }}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  View Course
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
