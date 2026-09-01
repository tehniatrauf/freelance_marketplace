// src/hooks/useJobSearch.js
import { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosConfig';

export const useJobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    minBudget: '',
    maxBudget: '',
    experienceLevel: '',
    remote: '',
    sortBy: 'recent',
  });

  const searchJobs = useCallback(async (searchParams = {}, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // Prepare query parameters
      const params = {
        page,
        limit: 10,
        ...filters,
        ...searchParams,
      };

      // Remove empty values
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      // Replace with actual API call
      // const response = await api.get('/jobs', { params });
      // setJobs(response.data.jobs);
      // setTotalJobs(response.data.total);
      // setTotalPages(response.data.totalPages);
      // setCurrentPage(response.data.currentPage);

      // Mock data - replace with actual API response
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockJobs = [
        {
          id: 1,
          title: 'Build E-Commerce Website',
          client: 'ABC Company',
          clientRating: 4.6,
          clientAvatar: 'https://ui-avatars.com/api/?name=ABC+Company&background=3b82f6&color=fff',
          description: 'We need a developer to create a fully functional e-commerce website with payment integration, user authentication, and admin dashboard. The site should be responsive and optimized for performance.',
          category: 'Web Development',
          skills: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Laravel'],
          budget: '$400',
          projectType: 'fixed',
          deadline: '20 Days',
          experienceLevel: 'Intermediate',
          isRemote: true,
          location: 'Remote',
          postedAt: '2 days ago',
          applications: 15,
          isSaved: false,
          matchScore: 92,
        },
        {
          id: 2,
          title: 'Mobile App for Health Tracking',
          client: 'TechStart Inc.',
          clientRating: 4.8,
          clientAvatar: 'https://ui-avatars.com/api/?name=TechStart+Inc&background=22c55e&color=fff',
          description: 'Looking for a React Native developer to build a health tracking app with features like step counting, heart rate monitoring, and sleep tracking.',
          category: 'Mobile Development',
          skills: ['React Native', 'Node.js', 'MongoDB', 'Express.js'],
          budget: '$800',
          projectType: 'fixed',
          deadline: '30 Days',
          experienceLevel: 'Expert',
          isRemote: true,
          location: 'Remote',
          postedAt: '3 days ago',
          applications: 8,
          isSaved: false,
          matchScore: 88,
        },
        {
          id: 3,
          title: 'Logo Design for Startup',
          client: 'StartupX',
          clientRating: 4.3,
          clientAvatar: 'https://ui-avatars.com/api/?name=StartupX&background=d946ef&color=fff',
          description: 'Need a creative logo design for a new tech startup. Looking for modern, minimalist design with unique color scheme.',
          category: 'Design & Creative',
          skills: ['Photoshop', 'Illustrator', 'Figma', 'Brand Design'],
          budget: '$200',
          projectType: 'fixed',
          deadline: '10 Days',
          experienceLevel: 'Entry',
          isRemote: true,
          location: 'Remote',
          postedAt: '1 day ago',
          applications: 22,
          isSaved: false,
          matchScore: 81,
        },
        {
          id: 4,
          title: 'Content Writing for Tech Blog',
          client: 'ContentHub',
          clientRating: 4.5,
          clientAvatar: 'https://ui-avatars.com/api/?name=ContentHub&background=ef4444&color=fff',
          description: 'Looking for a content writer for our tech blog. Topics include AI, machine learning, web development, and startup culture.',
          category: 'Writing & Translation',
          skills: ['Content Writing', 'SEO', 'Blog Writing', 'Technical Writing'],
          budget: '$150',
          projectType: 'fixed',
          deadline: '7 Days',
          experienceLevel: 'Entry',
          isRemote: true,
          location: 'Remote',
          postedAt: '5 days ago',
          applications: 12,
          isSaved: false,
          matchScore: 76,
        },
        {
          id: 5,
          title: 'Full Stack Developer Needed',
          client: 'Enterprise Solutions',
          clientRating: 4.9,
          clientAvatar: 'https://ui-avatars.com/api/?name=Enterprise+Solutions&background=8b5cf6&color=fff',
          description: 'Looking for a full stack developer with experience in React, Node.js, and PostgreSQL. Must have strong problem-solving skills.',
          category: 'Web Development',
          skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
          budget: '$600',
          projectType: 'fixed',
          deadline: '25 Days',
          experienceLevel: 'Expert',
          isRemote: true,
          location: 'Remote',
          postedAt: '4 days ago',
          applications: 10,
          isSaved: false,
          matchScore: 95,
        },
        {
          id: 6,
          title: 'Digital Marketing Campaign',
          client: 'GrowthX',
          clientRating: 4.2,
          clientAvatar: 'https://ui-avatars.com/api/?name=GrowthX&background=10b981&color=fff',
          description: 'Need a digital marketing expert to run campaigns for our SaaS product. Experience with Google Ads, Facebook Ads, and SEO required.',
          category: 'Digital Marketing',
          skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Strategy'],
          budget: '$300',
          projectType: 'fixed',
          deadline: '15 Days',
          experienceLevel: 'Intermediate',
          isRemote: true,
          location: 'Remote',
          postedAt: '2 days ago',
          applications: 18,
          isSaved: false,
          matchScore: 70,
        },
      ];

      // Apply filters
      let filtered = [...mockJobs];

      // Keyword filter
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase();
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword) ||
          job.skills.some(skill => skill.toLowerCase().includes(keyword))
        );
      }

      // Category filter
      if (params.category) {
        filtered = filtered.filter(job => job.category === params.category);
      }

      // Experience level filter
      if (params.experienceLevel) {
        filtered = filtered.filter(job => job.experienceLevel === params.experienceLevel);
      }

      // Remote filter
      if (params.remote !== undefined && params.remote !== '') {
        const isRemote = params.remote === 'true';
        filtered = filtered.filter(job => job.isRemote === isRemote);
      }

      // Budget range filter
      if (params.minBudget) {
        const min = parseFloat(params.minBudget);
        filtered = filtered.filter(job => parseFloat(job.budget.replace('$', '')) >= min);
      }
      if (params.maxBudget) {
        const max = parseFloat(params.maxBudget);
        filtered = filtered.filter(job => parseFloat(job.budget.replace('$', '')) <= max);
      }

      // Sorting
      if (params.sortBy) {
        switch (params.sortBy) {
          case 'recent':
            // Already sorted by postedAt in mock data
            break;
          case 'budget_high':
            filtered.sort((a, b) => parseFloat(b.budget.replace('$', '')) - parseFloat(a.budget.replace('$', '')));
            break;
          case 'budget_low':
            filtered.sort((a, b) => parseFloat(a.budget.replace('$', '')) - parseFloat(b.budget.replace('$', '')));
            break;
          case 'match':
            filtered.sort((a, b) => b.matchScore - a.matchScore);
            break;
          case 'applications':
            filtered.sort((a, b) => b.applications - a.applications);
            break;
          default:
            break;
        }
      }

      // Pagination
      const total = filtered.length;
      const limit = params.limit || 10;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filtered.slice(startIndex, endIndex);

      setJobs(paginatedJobs);
      setTotalJobs(total);
      setTotalPages(totalPages);
      setCurrentPage(page);

    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      setJobs([]);
      setTotalJobs(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      keyword: '',
      category: '',
      minBudget: '',
      maxBudget: '',
      experienceLevel: '',
      remote: '',
      sortBy: 'recent',
    });
  }, []);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      searchJobs({}, page);
    }
  }, [searchJobs, totalPages]);

  const saveJob = useCallback(async (jobId) => {
    try {
      // Replace with actual API call
      // await api.post(`/jobs/${jobId}/save`);
      
      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
        )
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const getJobById = useCallback(async (jobId) => {
    try {
      // Replace with actual API call
      // const response = await api.get(`/jobs/${jobId}`);
      // return response.data;
      
      // Mock data
      const mockJob = {
        id: parseInt(jobId),
        title: 'Build E-Commerce Website',
        client: 'ABC Company',
        clientRating: 4.6,
        clientAvatar: 'https://ui-avatars.com/api/?name=ABC+Company&background=3b82f6&color=fff',
        description: 'We need a developer to create a fully functional e-commerce website with payment integration, user authentication, and admin dashboard.',
        category: 'Web Development',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
        budget: '$400 - $600',
        projectType: 'fixed',
        deadline: '20 Days',
        experienceLevel: 'Intermediate',
        isRemote: true,
        location: 'Remote',
        postedAt: '2 days ago',
        applications: 15,
        screeningQuestions: [
          'What is your experience with e-commerce platforms?',
          'How would you handle payment integration?',
          'What security measures would you implement?'
        ],
        attachments: ['requirements.pdf', 'design.fig'],
        aboutClient: 'ABC Company is a leading e-commerce solutions provider with 10 years of experience.',
        totalHires: 45,
        totalJobs: 87,
      };
      return mockJob;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch job details');
    }
  }, []);

  // Initial search on mount
  useEffect(() => {
    searchJobs();
  }, [searchJobs]);

  return {
    jobs,
    loading,
    error,
    totalJobs,
    currentPage,
    totalPages,
    filters,
    updateFilters,
    clearFilters,
    searchJobs,
    goToPage,
    saveJob,
    getJobById,
  };
};