import { useState } from 'react';
import { Search, Menu, X, ChevronDown, MessageSquare, User, Settings, Bell } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-800">Aesthetic</span>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a 
                  href="#" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'home' 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('home')}
                >
                  Home
                </a>
                <a 
                  href="#" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'features' 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </a>
                <a 
                  href="#" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'pricing' 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('pricing')}
                >
                  Pricing
                </a>
                <a 
                  href="#" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'about' 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </a>
              </nav>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex-shrink-0">
                <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Get Started
                </button>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Bell size={20} />
                </button>
                <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <MessageSquare size={20} />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button className="max-w-xs bg-gray-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User size={16} className="text-indigo-600" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  activeTab === 'home'
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => {
                  setActiveTab('home');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </a>
              <a
                href="#"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  activeTab === 'features'
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => {
                  setActiveTab('features');
                  setIsMenuOpen(false);
                }}
              >
                Features
              </a>
              <a
                href="#"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  activeTab === 'pricing'
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => {
                  setActiveTab('pricing');
                  setIsMenuOpen(false);
                }}
              >
                Pricing
              </a>
              <a
                href="#"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  activeTab === 'about'
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => {
                  setActiveTab('about');
                  setIsMenuOpen(false);
                }}
              >
                About
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User size={20} className="text-indigo-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User Name</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
                <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Bell size={20} />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            <div className="relative bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                  <svg
                    className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                    fill="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <polygon points="50,0 100,0 50,100 0,100" />
                  </svg>

                  <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

                  <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Beautiful design for</span>{' '}
                        <span className="block text-indigo-600 xl:inline">your digital presence</span>
                      </h1>
                      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Create a stunning website that blends traditional elements with modern aesthetics. 
                        Our platform helps you build a professional online presence that stands out.
                      </p>
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                          <a
                            href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                          >
                            Get started
                          </a>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <a
                            href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                          >
                            Live demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="h-56 w-full bg-indigo-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
                  <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
                    <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-indigo-500 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features section */}
            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A better way to showcase your work
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Our platform combines traditional design elements with modern functionality to create
                    websites that are both beautiful and effective.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    {[
                      {
                        title: 'Responsive Design',
                        description: 'Layouts that automatically adapt to any screen size, ensuring your site looks great on all devices.'
                      },
                      {
                        title: 'Modern Aesthetics',
                        description: 'Clean, elegant design principles that create a professional and timeless appearance.'
                      },
                      {
                        title: 'User-Friendly Navigation',
                        description: "Intuitive interfaces that help visitors find what they're looking for quickly and easily."
                      },
                      {
                        title: 'Performance Optimized',
                        description: 'Fast loading times and smooth interactions for an exceptional user experience.'
                      }
                    ].map((feature, index) => (
                      <div key={index} className="relative">
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="ml-16">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                          <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-700">
              <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                  <span className="block">Create your website today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Join thousands of satisfied customers who have transformed their online presence with our platform.
                </p>
                <a
                  href="#"
                  className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                >
                  Sign up for free
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Everything you need to succeed online
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                  Our comprehensive suite of tools and features makes it easy to create a professional website.
                </p>
              </div>
              
              <div className="mt-20">
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  {[
                    {
                      title: "Responsive Layouts",
                      description: "Automatically adapts to any screen size, ensuring your site looks great on all devices."
                    },
                    {
                      title: "SEO Optimization",
                      description: "Built-in tools to help your site rank higher in search engine results."
                    },
                    {
                      title: "Custom Domains",
                      description: "Use your own domain name to create a professional branded experience."
                    },
                    {
                      title: "Analytics Integration",
                      description: "Track visitor behavior and performance with detailed analytics."
                    },
                    {
                      title: "Content Management",
                      description: "Easy-to-use tools for updating and managing your content."
                    },
                    {
                      title: "Social Media Integration",
                      description: "Connect your site to social platforms to extend your reach."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                        <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Plans for businesses of all sizes
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                  Choose the perfect plan for your needs. All plans include our core features.
                </p>
              </div>
              
              <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                {[
                  {
                    name: "Starter",
                    price: "$12",
                    description: "Perfect for small personal projects",
                    features: ["1 website", "5 pages", "Custom domain", "Basic analytics", "24/7 support"]
                  },
                  {
                    name: "Professional",
                    price: "$24",
                    description: "Ideal for businesses and portfolios",
                    features: ["5 websites", "Unlimited pages", "Custom domains", "Advanced analytics", "Priority support", "E-commerce ready"]
                  },
                  {
                    name: "Enterprise",
                    price: "$49",
                    description: "For larger organizations with complex needs",
                    features: ["Unlimited websites", "Unlimited pages", "Custom domains", "Advanced analytics", "Dedicated support", "E-commerce ready", "API access", "Custom integrations"]
                  }
                ].map((plan, index) => (
                  <div key={index} className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${index === 1 ? 'bg-white ring-2 ring-indigo-600' : 'bg-white'}`}>
                    <div className="p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.name}</h3>
                      <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                      <p className="mt-8">
                        <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                        <span className="text-base font-medium text-gray-500">/mo</span>
                      </p>
                      <a
                        href="#"
                        className={`mt-8 block w-full bg-${index === 1 ? 'indigo-600 hover:bg-indigo-700' : 'gray-800 hover:bg-gray-900'} border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center`}
                      >
                        {index === 1 ? 'Start your trial' : 'Get started'}
                      </a>
                    </div>
                    <div className="pt-6 pb-8 px-6">
                      <h4 className="text-sm font-medium text-gray-900">What's included</h4>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex">
                            <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-3 text-sm text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Our Story
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  We're a team of designers and developers passionate about creating beautiful, functional websites.
                </p>
              </div>

              <div className="mt-10">
                <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
                  <p>
                    Founded in 2020, our company was born from a simple idea: web design should be accessible to everyone, 
                    regardless of technical skill. We noticed that many platforms were either too complicated or produced 
                    generic-looking results.
                  </p>
                  <p>
                    Our mission is to bridge the gap between traditional design principles and modern web technology. 
                    We believe that websites should be both beautiful and functional, creating meaningful experiences 
                    for visitors while helping businesses achieve their goals.
                  </p>
                  <p>
                    Today, our platform is used by thousands of customers around the world, from small business owners 
                    to creative professionals. We continue to innovate and improve our platform based on customer feedback 
                    and emerging design trends.
                  </p>
                  <blockquote>
                    "We're not just building websites; we're creating digital experiences that leave lasting impressions."
                  </blockquote>
                  <h3>Our Team</h3>
                  <p>
                    Our diverse team brings together expertise from various design disciplines, web development, and 
                    user experience. We're united by our passion for creating beautiful, effective websites that help 
                    our customers succeed online.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        name: "Jane Cooper",
                        title: "Founder & CEO",
                        bio: "15+ years of experience in web design and digital marketing."
                      },
                      {
                        name: "Michael Scott",
                        title: "Lead Designer",
                        bio: "Award-winning designer with a passion for typography and color theory."
                      },
                      {
                        name: "Sarah Johnson",
                        title: "Head of Development",
                        bio: "Frontend expert specialized in creating responsive, accessible websites."
                      },
                    ].map((person, index) => (
                      <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                              <User size={24} className="text-indigo-600" />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {person.name}
                              </h3>
                              <p className="text-sm text-indigo-600">{person.title}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">{person.bio}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Home
              </a>
            </div>
            <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-300 hover:text-white">
                Features
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Pricing
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Blog
              </a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 Aesthetic, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;