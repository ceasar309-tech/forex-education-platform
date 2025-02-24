import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  CircularProgress,
  Divider,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayCircleOutline as PlayIcon,
  Assignment as AssignmentIcon,
  NoteAdd as NoteIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface Module {
  id: number;
  title: string;
  content: string;
  videoUrl?: string;
  quiz?: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

interface Course {
  id: number;
  title: string;
  description: string;
  type: string;
  level: string;
  modules: Module[];
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5002/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
        
        // Fetch user progress
        const progressResponse = await axios.get(
          `http://localhost:5002/api/courses/${id}/progress`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProgress(progressResponse.data.progress);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSaveNote = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5002/api/courses/${id}/notes`,
        { content: note, moduleId: activeModule },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNote('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save note');
    }
  };

  const handleModuleCompletion = async (moduleId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5002/api/courses/${id}/progress`,
        { moduleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update progress
      setProgress((prev) => 
        Math.min(100, prev + (100 / (course?.modules.length || 1)))
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update progress');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error || 'Course not found'}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {course.title}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {course.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="text.secondary" align="right">
            {Math.round(progress)}% Complete
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {course.modules.map((module, index) => (
            <Accordion
              key={module.id}
              expanded={activeModule === module.id}
              onChange={() => setActiveModule(activeModule === module.id ? null : module.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Module {index + 1}: {module.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {module.videoUrl && (
                    <Box sx={{ mb: 2 }}>
                      <Button
                        startIcon={<PlayIcon />}
                        variant="contained"
                        fullWidth
                      >
                        Watch Video
                      </Button>
                    </Box>
                  )}
                  
                  <Typography paragraph>{module.content}</Typography>
                  
                  {module.quiz && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        startIcon={<AssignmentIcon />}
                        variant="outlined"
                        fullWidth
                      >
                        Take Quiz
                      </Button>
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => handleModuleCompletion(module.id)}
                    >
                      Mark as Complete
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Notes
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Take notes here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              startIcon={<NoteIcon />}
              variant="contained"
              fullWidth
              onClick={handleSaveNote}
              disabled={!note.trim()}
            >
              Save Note
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;
