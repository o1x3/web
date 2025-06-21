'use client'

import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { createUniqueFavicon, startUniqueFaviconRotation } from './favicon-manager'

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Simplified theme toggle
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  // Simple mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    // Start favicon rotation after initial render
    const timer = setTimeout(() => {
      startUniqueFaviconRotation()
    }, 100)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Simplified projects data
  const projects = useMemo(() => [
    {
      title: 'Loan Default Prediction',
      items: ['ML model with feature engineering', 'Credit risk scoring system', 'AWS deployment with real-time API']
    },
    {
      title: 'Data Engineering Consultant',
      items: ['Web scraping pipelines with Flask APIs', 'Data cleaning and transformation', 'Automated web servers']
    },
    {
      title: 'ADAS Development',
      items: ['Raspberry Pi lane following prototype', 'Hospital adaptation (pending publication)', 'Real-time CV processing at 30fps']
    },
    {
      title: 'AI Chat Platform',
      items: ['Multi-agent conversation system', 'Vector database integration', 'WebSocket real-time communication']
    },
    {
      title: 'Blockchain Analytics',
      items: ['Smart contract interaction analysis', 'Transaction pattern detection', 'Real-time monitoring dashboard']
    },
    {
      title: 'Neural Style Transfer',
      items: ['CNN-based artistic style transfer', 'GPU-accelerated CUDA processing', 'Interactive web interface']
    }
  ], [])

  // Mobile Layout Component
  const MobileLayout = memo(function MobileLayout() {
    return (
      <div className="h-screen overflow-y-auto font-mono p-4 text-sm">
        <div className="flex flex-col space-y-6">

          {/* Mobile Theme toggle */}
          <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 text-xs opacity-50 hover:opacity-100 transition-opacity z-10"
          >
            {isDark ? 'light' : 'dark'}
          </button>

          {/* Mobile Header */}
          <header className="text-center">
            <h1
              className="font-bold text-lg cursor-pointer hover:opacity-80 transition-opacity duration-500 mb-2"
              onClick={() => window.open('https://linkedin.com/in/karthik-vinayan', '_blank')}
            >
              Karthik Vinayan
            </h1>
            <p className="opacity-70 mb-1">Software Engineer - AI/ML</p>
            <p className="opacity-50">Currently @ Omni RPA Inc</p>
          </header>

          {/* Mobile Quick Info Strip */}
          <div className="bg-gray-900/30 rounded-lg p-3 text-center text-xs">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="opacity-50">STACK</div>
                <div>Python • ML • Cloud</div>
              </div>
              <div>
                <div className="opacity-50">EXP</div>
                <div>1.5+ Years</div>
              </div>
              <div>
                <div className="opacity-50">LOC</div>
                <div>Hyderabad, IN</div>
              </div>
            </div>
          </div>

          {/* Mobile Experience */}
          <section>
            <h2 className="font-bold text-base mb-3">Experience</h2>
            <div className="space-y-3">
              <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm">Omni RPA Inc</h3>
                  <span className="opacity-50 text-xs">2023-Present</span>
                </div>
                <p className="opacity-70 text-xs mb-1">Software Engineer - AI/ML</p>
                <ul className="text-xs">
                  <li>• LLM agents with Knowledge Graph (NebulaGraph)</li>
                </ul>
              </div>

              <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm">Digital University of Kerala</h3>
                  <span className="opacity-50 text-xs">2023</span>
                </div>
                <p className="opacity-70 text-xs mb-1">Research Intern</p>
                <ul className="text-xs">
                  <li>• YOLOv8 computer vision for tomato detection</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mobile Education */}
          <section>
            <h2 className="font-bold text-base mb-3">Education</h2>
            <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-sm">VIT Chennai</h3>
                <span className="opacity-50 text-xs">2021-2025</span>
              </div>
              <p className="opacity-70 text-xs">B.Tech CS - AI & Machine Learning</p>
            </div>
          </section>

          {/* Mobile Skills */}
          <section>
            <h2 className="font-bold text-base mb-3">Skills</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-900/20 rounded p-2">
                <span className="opacity-50">Programming:</span><br />
                Python, C++, Java
              </div>
              <div className="bg-gray-900/20 rounded p-2">
                <span className="opacity-50">AI/ML:</span><br />
                TensorFlow, PyTorch, LLMs
              </div>
              <div className="bg-gray-900/20 rounded p-2">
                <span className="opacity-50">Cloud:</span><br />
                AWS, Azure, GCP
              </div>
              <div className="bg-gray-900/20 rounded p-2">
                <span className="opacity-50">Tools:</span><br />
                Docker, Git, Flask
              </div>
            </div>
          </section>

          {/* Mobile Projects */}
          <section>
            <h2 className="font-bold text-base mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.slice(0, 3).map((project, index) => (
                <div key={index} className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
                  <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
                  <ul className="text-xs space-y-1">
                    <li className="opacity-80">• {project.items[0]}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile Contact */}
          <section>
            <h2 className="font-bold text-base mb-3">Contact</h2>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:karthikvinayan57@gmail.com"
                className="block hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span className="opacity-50">email:</span> karthikvinayan57@gmail.com
              </a>
              <div>
                <span className="opacity-50">location:</span> Hyderabad, IN
              </div>
              <a
                href="https://linkedin.com/in/karthik-vinayan"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span className="opacity-50">linkedin:</span> linkedin.com/in/karthik-vinayan
              </a>
            </div>
          </section>

          <div className="h-6"></div>
        </div>
      </div>
    )
  })

  // Desktop Layout Component
  const DesktopLayout = memo(function DesktopLayout() {
    return (
      <div className="max-w-7xl mx-auto h-screen font-mono overflow-hidden" style={{
        padding: 'clamp(1rem, 2vh, 2rem)',
        fontSize: 'clamp(0.875rem, 1.5vh, 1rem)'
      }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 h-full" style={{
          gap: 'clamp(1rem, 2vh, 1.5rem)'
        }}>

          {/* Left Column - Main content */}
          <div className="lg:col-span-3 xl:col-span-3 overflow-hidden flex flex-col" style={{
            gap: 'clamp(0.75rem, 1.5vh, 1.25rem)'
          }}>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="fixed top-6 right-6 text-sm opacity-50 hover:opacity-100 transition-opacity z-10"
            >
              {isDark ? 'light' : 'dark'}
            </button>

            {/* Header */}
            <header>
              <h1
                className="font-bold cursor-pointer hover:opacity-80 transition-opacity duration-500"
                style={{
                  fontSize: 'clamp(1.25rem, 3vh, 2rem)',
                  marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
                }}
                onClick={() => window.open('https://linkedin.com/in/karthik-vinayan', '_blank')}
              >
                Karthik Vinayan
              </h1>
              <p className="opacity-70" style={{ marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                Software Engineer - AI/ML
              </p>
              <p className="opacity-50">Currently @ Omni RPA Inc</p>
            </header>

            {/* Contact */}
            <section>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                <a
                  href="mailto:karthikvinayan57@gmail.com"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}
                >
                  <span className="opacity-50">email:</span> karthikvinayan57@gmail.com
                </a>
                <div style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
                  <span className="opacity-50">location:</span> Hyderabad, IN
                </div>
                <a
                  href="https://linkedin.com/in/karthik-vinayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}
                >
                  <span className="opacity-50">linkedin:</span> linkedin.com/in/karthik-vinayan
                </a>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="font-bold" style={{
                fontSize: 'clamp(1rem, 2.5vh, 1.25rem)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                <div className="hover:opacity-90 transition-opacity">
                  <div className="flex justify-between items-start" style={{ marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                    <h3 className="font-semibold" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Omni RPA Inc</h3>
                    <span className="opacity-50" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>Jul 2023 - Present</span>
                  </div>
                  <p className="opacity-70" style={{
                    marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)',
                    fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)'
                  }}>Software Engineer - AI/ML • San Jose, CA</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.125rem, 0.25vh, 0.25rem)' }}>
                    <li style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>• Custom agentic AI solutions with LLM agents + Knowledge Graph</li>
                    <li style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>• Modular workflows with domain-specific LLM agents</li>
                  </ul>
                </div>

                <div className="hover:opacity-90 transition-opacity">
                  <div className="flex justify-between items-start" style={{ marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                    <h3 className="font-semibold" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Digital University of Kerala</h3>
                    <span className="opacity-50" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>Oct 2023 - Dec 2023</span>
                  </div>
                  <p className="opacity-70" style={{
                    marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)',
                    fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)'
                  }}>Research Intern • Thiruvananthapuram, IN</p>
                  <ul>
                    <li style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>• YOLOv8 computer vision for real-time tomato ripeness detection</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-bold" style={{
                fontSize: 'clamp(1rem, 2.5vh, 1.25rem)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}>Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                <div className="hover:opacity-90 transition-opacity">
                  <div className="flex justify-between items-start" style={{ marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                    <h3 className="font-semibold" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>Vellore Institute of Technology</h3>
                    <span className="opacity-50" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>2021 - 2025</span>
                  </div>
                  <p className="opacity-70" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>B.Tech Computer Science - AI & Machine Learning • Chennai, IN</p>
                </div>

                <div className="hover:opacity-90 transition-opacity">
                  <div className="flex justify-between items-start" style={{ marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                    <h3 className="font-semibold" style={{ fontSize: 'clamp(0.875rem, 1.5vh, 1rem)' }}>St. Thomas Central School</h3>
                    <span className="opacity-50" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>2009 - 2021</span>
                  </div>
                  <p className="opacity-70" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>AISSCE - PCM with CS • Thiruvananthapuram, IN</p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="font-bold" style={{
                fontSize: 'clamp(1rem, 2.5vh, 1.25rem)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}>Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{
                gap: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}>
                <div className="hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
                  <span className="opacity-50">Programming:</span> Python, C++, Java, SQL
                </div>
                <div className="hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
                  <span className="opacity-50">AI/ML:</span> TensorFlow, PyTorch, LLMs, Computer Vision
                </div>
                <div className="hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
                  <span className="opacity-50">Cloud:</span> AWS, Azure (AZ-104), GCP, BigQuery
                </div>
                <div className="hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
                  <span className="opacity-50">Tools:</span> Docker, Git, Flask, GraphDBs
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
              <h2 className="font-bold" style={{
                fontSize: 'clamp(1rem, 2.5vh, 1.25rem)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}>Projects</h2>
              <div
                className="grid grid-cols-1 xl:grid-cols-2 h-full overflow-hidden"
                style={{
                  gap: 'clamp(0.75rem, 1.5vh, 1rem)',
                  alignContent: 'start'
                }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="hover:opacity-90 transition-opacity">
                    <h3 className="font-semibold" style={{
                      marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)',
                      fontSize: 'clamp(0.875rem, 1.5vh, 1rem)'
                    }}>{project.title}</h3>
                    <ul style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'clamp(0.125rem, 0.25vh, 0.25rem)'
                    }}>
                      {project.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="opacity-80" style={{
                          fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)'
                        }}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Only show on large screens */}
          <div className="hidden lg:block lg:col-span-2 xl:col-span-2 overflow-hidden">
            <div className="sticky top-4 space-y-6">

              {/* Quick contact */}
              <div>
                <h3 className="font-bold opacity-50 mb-3">CONTACT</h3>
                <div className="space-y-1">
                  <a
                    href="mailto:karthikvinayan57@gmail.com"
                    className="block hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    karthikvinayan57@gmail.com
                  </a>
                  <div>Hyderabad, IN</div>
                  <a
                    href="https://linkedin.com/in/karthik-vinayan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    linkedin.com/in/karthik-vinayan
                  </a>
                </div>
              </div>

              {/* Skills overview */}
              <div>
                <h3 className="font-bold opacity-50 mb-3">STACK</h3>
                <div className="space-y-1">
                  <div>Python • C++ • Java • SQL</div>
                  <div>TensorFlow • PyTorch • LLMs</div>
                  <div>AWS • Azure • GCP</div>
                  <div>Docker • Git • Flask</div>
                </div>
              </div>

              {/* Current status */}
              <div>
                <h3 className="font-bold opacity-50 mb-3">STATUS</h3>
                <div>
                  <div className="mb-1">Software Engineer - AI/ML</div>
                  <div className="opacity-60">@ Omni RPA Inc</div>
                  <div className="opacity-40 mt-2">Jul 2023 - Present</div>
                </div>
              </div>

              {/* Education quick */}
              <div>
                <h3 className="font-bold opacity-50 mb-3">EDUCATION</h3>
                <div>
                  <div className="mb-1">VIT Chennai</div>
                  <div className="opacity-60">B.Tech CS - AI/ML</div>
                  <div className="opacity-40">2021 - 2025</div>
                </div>
              </div>

              {/* Recent work */}
              <div>
                <h3 className="font-bold opacity-50 mb-3">RECENT</h3>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1">LLM Agent Workflows</div>
                    <div className="opacity-60">NebulaGraph + contextual adaptation</div>
                  </div>
                  <div>
                    <div className="mb-1">Computer Vision</div>
                    <div className="opacity-60">YOLOv8 tomato detection</div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-bold opacity-50 mb-3">CERTS</h3>
                <div className="space-y-1">
                  <div>Azure AZ-104</div>
                  <div>AWS Solutions Architect</div>
                  <div>TensorFlow Developer</div>
                  <div>Google Cloud Professional</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  })

  return (
    <div className={`h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  )
}