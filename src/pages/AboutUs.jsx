import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Heart, Users, Target, Award, Sparkles, Globe } from 'lucide-react';

export default function AboutUs() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Passionate about helping couples strengthen their relationships through technology.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Tech enthusiast dedicated to creating beautiful, user-friendly experiences.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Creative designer focused on making love beautiful through thoughtful design.'
    },
    {
      name: 'David Kim',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Storyteller helping couples discover the magic of One 2 One Love.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Love First',
      description: 'Every feature we build is designed to strengthen the bonds between couples and celebrate love in all its forms.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building a supportive community where couples can share, learn, and grow together.'
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Our mission is to make relationships stronger, more connected, and filled with joy and romance.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from user experience to customer support.'
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'One 2 One Love Founded',
      description: 'Started with a simple idea: help couples celebrate their unique love story.'
    },
    {
      year: '2023',
      title: '10,000 Couples',
      description: 'Reached our first major milestone of 10,000 active couples on the platform.'
    },
    {
      year: '2023',
      title: 'Love Quiz Launch',
      description: 'Introduced interactive love language quizzes and relationship games.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to serve couples in over 50 countries with multi-language support.'
    },
    {
      year: '2024',
      title: 'Professional Network',
      description: 'Built a network of therapists, coaches, and influencers to support couples.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link
              to={createPageUrl("Home")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </Link>
            <div className="flex items-center">
              <Heart className="text-pink-500 fill-pink-500 mr-3" size={32} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-dancing">
                  About One 2 One Love
                </h1>
                <p className="text-sm text-gray-500">
                  Our story, mission, and the team behind the magic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 font-dancing">
            Making Love <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Beautiful</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            One 2 One Love was born from a simple belief: every couple deserves tools to express their love in beautiful, 
            meaningful ways. We're here to help you celebrate your relationship, strengthen your bond, and create 
            lasting memories together.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Couples</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">Love Notes Created</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-dancing">Our Mission</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To strengthen relationships worldwide by providing couples with beautiful, innovative tools 
              to express love, connect deeply, and celebrate their unique journey together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-dancing">Meet Our Team</h3>
            <p className="text-xl text-gray-600">
              The passionate people behind One 2 One Love, dedicated to celebrating love every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-200"
                />
                <h4 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h4>
                <p className="text-pink-600 font-medium mb-3 text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-dancing">Our Journey</h3>
            <p className="text-xl text-gray-600">
              From a simple idea to helping couples worldwide express their love.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm mr-6 flex-shrink-0 shadow-lg">
                  {milestone.year}
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md flex-1 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 font-dancing">Get In Touch</h3>
          <p className="text-xl text-pink-100 mb-8">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="text-pink-200 mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Visit Us</h4>
              <p className="text-pink-100 text-sm">One2onelove.com<br />Available Worldwide</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Heart className="text-pink-200 fill-pink-200 mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Email Us</h4>
              <p className="text-pink-100 text-sm">hello@one2onelove.com<br />support@one2onelove.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Sparkles className="text-pink-200 mx-auto mb-4" size={32} />
              <h4 className="font-bold mb-2">Follow Us</h4>
              <p className="text-pink-100 text-sm">@One2OneLove<br />on all social platforms</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 font-dancing">Ready to Celebrate Your Love?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of couples who are strengthening their relationships with One 2 One Love.
          </p>
          <Link to={createPageUrl("Signup")}>
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all">
              <Heart className="inline-block mr-2 fill-current" size={20} />
              Get Started Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}