"use client";
import React, { useState } from 'react';
import { 
  FileText, 
  Youtube, 
  File, 
  Brain, 
  Menu, 
  X, 
  CheckCircle, 
  Play, 
  ArrowRight,
  Clock,
  Shield
} from 'lucide-react';

const TaskMasterHomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const noteTypes = [
    {
      icon: <Youtube className="h-12 w-12 text-red-500" />,
      title: "YouTube Notes",
      description: "Save YouTube video links with your notes. Click to instantly redirect back to the exact video for reference.",
      features: ["Direct video linking", "Quick access", "Organized by topic"]
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-500" />,
      title: "Regular Notes",
      description: "Create traditional notes with titles and descriptions. Perfect for ideas, thoughts, and quick reminders.",
      features: ["Rich text editing", "Title & description", "Easy organization"]
    },
    {
      icon: <File className="h-12 w-12 text-green-500" />,
      title: "PDF Notes",
      description: "Upload and store PDF files with built-in AI summarization. Get key insights from documents instantly.",
      features: ["PDF storage", "AI summarization", "Quick insights"]
    }
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "AI-Powered PDF Summarization",
      description: "Upload any PDF and get intelligent summaries highlighting key points and insights."
    },
    {
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      title: "YouTube Integration",
      description: "Save video links with your notes and redirect instantly to continue watching where you left off."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Completely Free",
      description: "All features are free forever. No hidden costs, no premium tiers, no limitations."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: "Quick Access",
      description: "Organize all your notes, videos, and PDFs in one place with instant search and filtering."
    }
  ];

  const stats = [
    { number: "3", label: "Note Types" },
    { number: "100%", label: "Free Forever" },
    { number: "∞", label: "Storage Limit" },
    { number: "24/7", label: "Access" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskMaster</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#note-types" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Note Types</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
              <a href="/sign-in" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sign In
              </a>
              <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Get Started Free
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-700 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
                <a href="#note-types" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Note Types</a>
                <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
                <a href="/sign-in" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Sign In
                </a>
                <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors text-center">
                  Get Started Free
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Your Notes,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Organized
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Store YouTube videos, regular notes, and PDFs all in one place. Get AI-powered PDF summaries and instant video access - completely free, forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center group">
                Start Taking Notes Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#note-types" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                See How It Works
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Sign-up Required to Browse</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI-Powered Features</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Types Section */}
      <section className="py-20 bg-white dark:bg-slate-900" id="note-types">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Three Powerful Note Types
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to organize your digital life - videos, documents, and ideas all in one place.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {noteTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-700 group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features, Zero Cost
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced functionality that would cost hundreds elsewhere - completely free in TaskMaster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-slate-900" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple. Powerful. Free.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in seconds - no credit card, no hidden fees, no limits.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Account</h3>
                <p className="text-gray-600 dark:text-gray-300">Quick sign-up at <strong>/sign-up</strong> - no verification needed</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-300">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Start Adding Notes</h3>
                <p className="text-gray-600 dark:text-gray-300">Add YouTube links, upload PDFs, or create regular notes instantly</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Anywhere</h3>
                <p className="text-gray-600 dark:text-gray-300">Your notes sync across devices - access them anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              See TaskMaster in Action
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Watch how easy it is to organize your YouTube videos, PDFs, and notes in one powerful platform.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 dark:text-gray-300">Interactive Demo Coming Soon</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">See all three note types in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Organize Your Digital Life?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join TaskMaster today and discover how easy it is to keep all your important content in one place - YouTube videos, PDFs, and notes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="/sign-in" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              I Have an Account
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Always free • No credit card required • Access all features
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">TaskMaster</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The free note management platform for YouTube videos, PDFs, and regular notes. Organize your digital life without limits.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Secure</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#note-types" className="hover:text-white transition-colors">YouTube Notes</a></li>
                <li><a href="#note-types" className="hover:text-white transition-colors">PDF Storage</a></li>
                <li><a href="#note-types" className="hover:text-white transition-colors">AI Summarization</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">All Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/sign-up" className="hover:text-white transition-colors">Sign Up</a></li>
                <li><a href="/sign-in" className="hover:text-white transition-colors">Sign In</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TaskMaster. Made with ❤️ for note-takers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaskMasterHomePage;
