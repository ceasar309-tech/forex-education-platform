import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface CourseProgress {
  courseId: number;
  courseTitle: string;
  progress: number;
  lastAccessed: string;
}

interface Note {
  id: number;
  content: string;
  courseTitle: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    coursesInProgress: 0,
    completedCourses: 0,
    totalTimeSpent: 0,
    averageScore: 0,
  });
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user stats
        const statsResponse = await axios.get(
          'http://localhost:5002/api/courses/stats',
          { headers }
        );
        setStats(statsResponse.data);

        // Fetch course progress
        const progressResponse = await axios.get(
          'http://localhost:5002/api/courses/progress',
          { headers }
        );
        setCourseProgress(progressResponse.data);

        // Fetch recent notes
        const notesResponse = await axios.get(
          'http://localhost:5002/api/courses/notes/recent',
          { headers }
        );
        setRecentNotes(notesResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Courses</Typography>
              </Box>
              <Typography variant="h4">{stats.coursesInProgress}</Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h4">{stats.completedCourses}</Typography>
              <Typography variant="body2" color="text.secondary">
                Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TimerIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Time Spent</Typography>
              </Box>
              <Typography variant="h4">{stats.totalTimeSpent}h</Typography>
              <Typography variant="body2" color="text.secondary">
                Learning
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <StarIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Average Score</Typography>
              </Box>
              <Typography variant="h4">{stats.averageScore}%</Typography>
              <Typography variant="body2" color="text.secondary">
                In Quizzes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Course Progress */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Course Progress
            </Typography>
            <List>
              {courseProgress.map((course, index) => (
                <React.Fragment key={course.courseId}>
                  <ListItem>
                    <ListItemText
                      primary={course.courseTitle}
                      secondary={`Last accessed: ${new Date(course.lastAccessed).toLocaleDateString()}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {course.progress}%
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/courses/${course.courseId}`)}
                      >
                        Continue
                      </Button>
                    </Box>
                  </ListItem>
                  {index < courseProgress.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Notes */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Notes
            </Typography>
            <List>
              {recentNotes.map((note, index) => (
                <React.Fragment key={note.id}>
                  <ListItem>
                    <ListItemText
                      primary={note.courseTitle}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {new Date(note.createdAt).toLocaleDateString()}
                          </Typography>
                          {" — "}{note.content}
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentNotes.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
