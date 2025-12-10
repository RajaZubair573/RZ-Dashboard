'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { User, Mail, MapPin, Briefcase, Edit, Save, X, Camera, Plus, Globe, Twitter, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [profile, setProfile] = useState({
    name: 'Raja Zubair',
    email: 'raja@example.com',
    title: 'UI/UX Designer & Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate about creating beautiful and functional user experiences. Specializing in modern web technologies and design systems. Currently working on exciting projects that make a difference.',
    skills: ['Figma', 'WebFlow', 'React', 'Next.js', 'TypeScript', 'Node.js'],
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    social: {
      website: 'raja-zubair.vercel.app',
      twitter: '@rajazubair',
      github: 'rajazubair',
      linkedin: 'in/rajazubair'
    }
  });

  const [editData, setEditData] = useState(profile);
  const [activeTab, setActiveTab] = useState('overview');

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Skill change handler
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...editData.skills];
    newSkills[index] = value;
    setEditData(prev => ({ ...prev, skills: newSkills }));
  };

  // Add new skill
  const addSkill = () => {
    setEditData(prev => ({
      ...prev,
      skills: [...prev.skills, 'New Skill']
    }));
  };

  // Remove skill
  const removeSkill = (index: number) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes
  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Profile</h1>
              <p className="text-blue-100">Manage your personal information</p>
            </div>
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </motion.button>
            ) : (
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden mb-8"
          >
            <div className="relative">
              {/* Cover Photo */}
              <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              
              {/* Profile Picture */}
              <div className="absolute -bottom-16 left-6">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                    <img
                      src={editData.avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 border border-gray-200"
                      >
                        <Camera className="h-5 w-5 text-gray-700" />
                      </motion.button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-20 px-6 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-blue-600 font-medium">{profile.title}</p>
                  <div className="flex items-center mt-1 text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'projects'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'activity'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Activity
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeTab === 'overview' && (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">About</h3>
                    <div className="prose prose-blue max-w-none">
                      <p className="text-gray-600">
                        {isEditing ? (
                          <textarea
                            name="bio"
                            rows={4}
                            value={editData.bio}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        ) : (
                          profile.bio
                        )}
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {editData.skills.map((skill, index) => (
                          <div key={index} className="relative group">
                            {isEditing ? (
                              <div className="flex items-center bg-blue-50 rounded-full px-3 py-1">
                                <input
                                  type="text"
                                  value={skill}
                                  onChange={(e) => handleSkillChange(index, e.target.value)}
                                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-blue-800 w-24"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSkill(index)}
                                  className="text-blue-400 hover:text-red-500 ml-1"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {skill}
                              </span>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <button
                            onClick={addSkill}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Skill
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="bg-white rounded-xl shadow overflow-hidden p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((project) => (
                      <div key={project} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">Project {project}</h4>
                            <p className="text-sm text-gray-500 mt-1">Description of project {project} and its key features.</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {['React', 'Next.js', 'Tailwind'].map((tech) => (
                                <span key={tech} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="bg-white rounded-xl shadow overflow-hidden p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((activity) => (
                      <div key={activity} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity === 1 && 'Completed project setup'}
                            {activity === 2 && 'Updated profile information'}
                            {activity === 3 && 'Added new skills'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}