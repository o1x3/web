'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Pre-calculate reasonable defaults based on common screen sizes
  const getInitialLayout = () => {
    // Use CSS viewport units for initial estimation to avoid jumps
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth / 100
      const vh = window.innerHeight / 100
      
      // Quick calculation for initial render
      const estimatedScale = Math.min(1, (vh * 100 - 80) / 800) // rough estimate
      
      return {
        fontSize: Math.max(10, Math.floor(14 * estimatedScale)),
        spacing: Math.max(8, Math.floor(16 * estimatedScale)),
        padding: Math.max(16, Math.floor(24 * estimatedScale)),
        headerSize: Math.max(18, Math.floor(24 * estimatedScale)),
        sectionSpacing: Math.max(12, Math.floor(20 * estimatedScale)),
        itemSpacing: Math.max(4, Math.floor(8 * estimatedScale)),
        gridCols: window.innerWidth < 1024 ? 1 : 2,
        showAllProjects: estimatedScale > 0.8,
        showSecondaryInfo: estimatedScale > 0.7
      }
    }
    
    // Fallback for SSR
    return {
      fontSize: 14,
      spacing: 16,
      padding: 24,
      headerSize: 24,
      sectionSpacing: 20,
      itemSpacing: 8,
      gridCols: 2,
      showAllProjects: true,
      showSecondaryInfo: true
    }
  }
  
  const getInitialMobileLayout = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight / 100
      const mobileScale = Math.max(0.7, Math.min(1.2, (vh * 100 - 60) / 720))
      
      return {
        fontSize: Math.max(10, Math.floor(12 * mobileScale)),
        headerSize: Math.max(14, Math.floor(18 * mobileScale)),
        sectionSpacing: Math.max(8, Math.floor(16 * mobileScale)),
        itemSpacing: Math.max(3, Math.floor(6 * mobileScale)),
        padding: Math.max(12, Math.floor(16 * mobileScale)),
        stackSections: true,
        showMiniSidebar: mobileScale > 0.8,
        projectsPerSection: mobileScale > 0.9 ? 3 : 2
      }
    }
    
    return {
      fontSize: 12,
      headerSize: 18,
      sectionSpacing: 16,
      itemSpacing: 6,
      padding: 16,
      stackSections: true,
      showMiniSidebar: true,
      projectsPerSection: 2
    }
  }
  
  const [layout, setLayout] = useState(getInitialLayout())
  const [mobileLayout, setMobileLayout] = useState(getInitialMobileLayout())

  useEffect(() => {
    const calculateOptimalLayout = () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      
      // Detect mobile devices
      const isMobileDevice = viewport.width < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
      
      if (isMobileDevice) {
        // Mobile-specific algorithm
        calculateMobileLayout(viewport)
      } else {
        // Desktop algorithm (existing)
        calculateDesktopLayout(viewport)
      }
      
      // Mark as initialized and show body after first calculation
      if (!isInitialized) {
        setIsInitialized(true)
        document.body.classList.add('loaded')
      }
    }
    
    const calculateMobileLayout = (viewport) => {
      const availableHeight = viewport.height - 60 // Account for mobile padding
      
      // Mobile sections with optimized heights
      const mobileSections = [
        { name: 'header', height: 100 },
        { name: 'contact', height: 80 },
        { name: 'experience', height: 140 },
        { name: 'education', height: 80 },
        { name: 'skills', height: 120 },
        { name: 'projects', height: 200 },
        { name: 'sidebar-mini', height: 120 }
      ]
      
      const totalMobileHeight = mobileSections.reduce((sum, section) => sum + section.height, 0)
      const mobileScale = Math.max(0.7, Math.min(1.2, availableHeight / totalMobileHeight))
      
      // Mobile-optimized settings
      let fontSize = Math.max(10, Math.floor(12 * mobileScale))
      let headerSize = Math.max(14, Math.floor(18 * mobileScale))
      let sectionSpacing = Math.max(8, Math.floor(16 * mobileScale))
      let itemSpacing = Math.max(3, Math.floor(6 * mobileScale))
      let padding = Math.max(12, Math.floor(16 * mobileScale))
      
      // Adaptive mobile features
      let showMiniSidebar = mobileScale > 0.8
      let projectsPerSection = mobileScale > 0.9 ? 3 : 2
      let stackSections = true
      
      // Aggressive space optimization for very small screens
      if (mobileScale < 0.8) {
        fontSize = 10
        headerSize = 14
        sectionSpacing = 8
        itemSpacing = 3
        projectsPerSection = 1
      }
      
      setMobileLayout({
        fontSize,
        headerSize,
        sectionSpacing,
        itemSpacing,
        padding,
        stackSections,
        showMiniSidebar,
        projectsPerSection
      })
    }
    
    const calculateDesktopLayout = (viewport) => {
      // Content sections with estimated heights
      const sections = [
        { name: 'header', baseHeight: 80, scalable: false },
        { name: 'contact', baseHeight: 80, scalable: false },
        { name: 'experience', baseHeight: 160, scalable: true },
        { name: 'education', baseHeight: 120, scalable: true },
        { name: 'skills', baseHeight: 100, scalable: false },
        { name: 'projects', baseHeight: 300, scalable: true, flexible: true }
      ]
      
      // Calculate available height (minus padding and margins)
      const availableHeight = viewport.height - 80 // Account for padding
      const availableWidth = viewport.width
      
      // Base content height calculation
      let totalBaseHeight = sections.reduce((sum, section) => sum + section.baseHeight, 0)
      
      // Dynamic scaling algorithm
      let scale = 1
      let fontSize = 14
      let spacing = 16
      let gridCols = 2
      let showAllProjects = true
      let showSecondaryInfo = true
      
      if (totalBaseHeight > availableHeight) {
        // Calculate scale factor needed to fit
        scale = Math.max(0.6, availableHeight / totalBaseHeight)
        
        // Adjust parameters based on scale
        fontSize = Math.max(10, Math.floor(14 * scale))
        spacing = Math.max(8, Math.floor(16 * scale))
        
        // Adaptive content showing
        if (scale < 0.8) {
          showSecondaryInfo = false
          totalBaseHeight *= 0.85 // Reduce height when hiding secondary info
        }
        
        if (scale < 0.7) {
          showAllProjects = false
          gridCols = 1 // Stack projects vertically for space
          totalBaseHeight *= 0.7 // Reduce height when showing fewer projects
        }
      } else {
        // We have extra space, can increase sizing
        const extraSpace = availableHeight - totalBaseHeight
        const extraScale = Math.min(1.3, 1 + (extraSpace / totalBaseHeight) * 0.5)
        
        fontSize = Math.min(18, Math.floor(14 * extraScale))
        spacing = Math.min(24, Math.floor(16 * extraScale))
      }
      
      // Width-based adjustments
      if (availableWidth < 1024) {
        gridCols = 1 // Force single column on smaller widths
      }
      
      // Optimal grid calculation for projects
      if (showAllProjects) {
        const projectCount = 6
        const optimalCols = Math.min(3, Math.floor(availableWidth / 300))
        gridCols = Math.max(1, optimalCols)
      }
      
      setLayout({
        fontSize,
        spacing,
        padding: Math.max(16, Math.floor(24 * scale)),
        headerSize: Math.max(18, Math.floor(24 * scale)),
        sectionSpacing: Math.max(12, Math.floor(20 * scale)),
        itemSpacing: Math.max(4, Math.floor(8 * scale)),
        gridCols,
        showAllProjects,
        showSecondaryInfo
      })
    }
    
    // Use requestAnimationFrame to avoid layout thrashing
    const handleResize = () => {
      requestAnimationFrame(calculateOptimalLayout)
    }
    
    // Calculate immediately but smoothly
    requestAnimationFrame(calculateOptimalLayout)
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isInitialized])

  const projects = [
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
  ]

  const displayedProjects = !isMobile 
    ? (layout.showAllProjects ? projects : projects.slice(0, 4))
    : projects.slice(0, mobileLayout.projectsPerSection)

  // Mobile Layout Component
  const MobileLayout = () => (
    <div 
      className="h-screen overflow-y-auto font-mono"
      style={{ 
        padding: `${mobileLayout.padding}px`,
        fontSize: `${mobileLayout.fontSize}px`
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${mobileLayout.sectionSpacing}px` }}>
        
        {/* Mobile Theme toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="fixed top-4 right-4 text-xs opacity-50 hover:opacity-100 transition-opacity z-10"
        >
          {isDark ? 'light' : 'dark'}
        </button>

        {/* Mobile Header */}
        <header className="text-center">
          <h1 
            className="font-bold cursor-pointer hover:opacity-80 transition-opacity duration-500" 
            style={{ 
              fontSize: `${mobileLayout.headerSize}px`,
              marginBottom: `${mobileLayout.itemSpacing}px`
            }}
            onClick={() => window.open('https://linkedin.com/in/karthik-vinayan', '_blank')}
          >
            Karthik Vinayan
          </h1>
          <p className="opacity-70" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
            Software Engineer - AI/ML
          </p>
          <p className="opacity-50">Currently @ Omni RPA Inc</p>
        </header>

        {/* Mobile Quick Info Strip */}
        {mobileLayout.showMiniSidebar && (
          <div 
            className="bg-gray-900/30 rounded-lg p-3 text-center"
            style={{ fontSize: `${mobileLayout.fontSize - 1}px` }}
          >
            <div className="grid grid-cols-3 gap-2 text-xs">
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
        )}

        {/* Mobile Experience */}
        <section>
          <h2 
            className="font-bold" 
            style={{ 
              fontSize: `${mobileLayout.fontSize + 2}px`,
              marginBottom: `${mobileLayout.itemSpacing}px`
            }}
          >
            Experience
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${mobileLayout.itemSpacing}px` }}>
            <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity duration-800">
              <div className="flex justify-between items-start" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
                <h3 className="font-semibold">Omni RPA Inc</h3>
                <span className="opacity-50 text-xs">2023-Present</span>
              </div>
              <p className="opacity-70 text-xs" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
                Software Engineer - AI/ML
              </p>
              <ul className="text-xs">
                <li>• LLM agents with Knowledge Graph (NebulaGraph)</li>
              </ul>
            </div>

            <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity duration-800">
              <div className="flex justify-between items-start" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
                <h3 className="font-semibold">Digital University of Kerala</h3>
                <span className="opacity-50 text-xs">2023</span>
              </div>
              <p className="opacity-70 text-xs" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
                Research Intern
              </p>
              <ul className="text-xs">
                <li>• YOLOv8 computer vision for tomato detection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mobile Education */}
        <section>
          <h2 
            className="font-bold" 
            style={{ 
              fontSize: `${mobileLayout.fontSize + 2}px`,
              marginBottom: `${mobileLayout.itemSpacing}px`
            }}
          >
            Education
          </h2>
          
          <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity duration-800">
            <div className="flex justify-between items-start" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
              <h3 className="font-semibold">VIT Chennai</h3>
              <span className="opacity-50 text-xs">2021-2025</span>
            </div>
            <p className="opacity-70 text-xs">B.Tech CS - AI & Machine Learning</p>
          </div>
        </section>

        {/* Mobile Skills */}
        <section>
          <h2 
            className="font-bold" 
            style={{ 
              fontSize: `${mobileLayout.fontSize + 2}px`,
              marginBottom: `${mobileLayout.itemSpacing}px`
            }}
          >
            Skills
          </h2>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-900/20 rounded p-2">
              <span className="opacity-50">Programming:</span><br/>
              Python, C++, Java
            </div>
            <div className="bg-gray-900/20 rounded p-2">
              <span className="opacity-50">AI/ML:</span><br/>
              TensorFlow, PyTorch, LLMs
            </div>
            <div className="bg-gray-900/20 rounded p-2">
              <span className="opacity-50">Cloud:</span><br/>
              AWS, Azure, GCP
            </div>
            <div className="bg-gray-900/20 rounded p-2">
              <span className="opacity-50">Tools:</span><br/>
              Docker, Git, Flask
            </div>
          </div>
        </section>

        {/* Mobile Projects */}
        <section>
          <h2 
            className="font-bold" 
            style={{ 
              fontSize: `${mobileLayout.fontSize + 2}px`,
              marginBottom: `${mobileLayout.itemSpacing}px`
            }}
          >
            Projects
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${mobileLayout.itemSpacing}px` }}>
            {displayedProjects.map((project, index) => (
              <div key={index} className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity duration-1000">
                <h3 className="font-semibold text-sm" style={{ marginBottom: `${mobileLayout.itemSpacing/2}px` }}>
                  {project.title}
                </h3>
                <ul className="text-xs" style={{ display: 'flex', flexDirection: 'column', gap: `${mobileLayout.itemSpacing/4}px` }}>
                  {project.items.slice(0, 1).map((item, itemIndex) => (
                    <li key={itemIndex} className="opacity-80">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Contact */}
        <section>
          <h2 
            className="font-bold" 
            style={{ 
              fontSize: `${mobileLayout.fontSize + 2}px`,
              marginBottom: `${mobileLayout.itemSpacing}px`
            }}
          >
            Contact
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${mobileLayout.itemSpacing/2}px` }}>
            <a 
              href="mailto:karthikvinayan57@gmail.com"
              className="text-xs hover:opacity-80 transition-opacity duration-700 cursor-pointer"
            >
              <span className="opacity-50">email:</span> karthikvinayan57@gmail.com
            </a>
            <div className="text-xs">
              <span className="opacity-50">location:</span> Hyderabad, IN
            </div>
            <a
              href="https://linkedin.com/in/karthik-vinayan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:opacity-80 transition-opacity duration-700 cursor-pointer"
            >
              <span className="opacity-50">linkedin:</span> linkedin.com/in/karthik-vinayan
            </a>
          </div>
        </section>

        {/* Mobile bottom spacing */}
        <div style={{ height: `${mobileLayout.padding}px` }}></div>
      </div>
    </div>
  )

  // Desktop Layout Component (existing)
  const DesktopLayout = () => {
    return (
      <div 
        className="max-w-7xl mx-auto h-full font-mono" 
        style={{ 
          padding: `${layout.padding}px`,
          fontSize: `${layout.fontSize}px`
        }}
      >
        <div 
          className="grid grid-cols-1 lg:grid-cols-5 h-full" 
          style={{ gap: `${layout.spacing}px` }}
        >
          {/* Left Column */}
          <div 
            className="lg:col-span-3 overflow-hidden flex flex-col" 
            style={{ gap: `${layout.sectionSpacing}px` }}
          >
            
            {/* Theme toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="fixed top-6 right-6 text-sm opacity-50 hover:opacity-100 transition-opacity"
            >
              {isDark ? 'light' : 'dark'}
            </button>

            {/* Header */}
            <header>
              <h1 
                className="font-bold cursor-pointer hover:opacity-80 transition-opacity duration-500" 
                style={{ 
                  fontSize: `${layout.headerSize}px`,
                  marginBottom: `${layout.itemSpacing}px`
                }}
                onClick={() => window.open('https://linkedin.com/in/karthik-vinayan', '_blank')}
              >
                Karthik Vinayan
              </h1>
              <p className="opacity-70" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                Software Engineer - AI/ML
              </p>
              <p className="opacity-50">Currently @ Omni RPA Inc</p>
            </header>

            {/* Contact */}
            <section>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing/2}px` }}>
                <a 
                  href="mailto:karthikvinayan57@gmail.com"
                  className="hover:opacity-80 transition-opacity duration-700 cursor-pointer"
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
                  className="hover:opacity-80 transition-opacity duration-700 cursor-pointer"
                >
                  <span className="opacity-50">linkedin:</span> linkedin.com/in/karthik-vinayan
                </a>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 
                className="font-bold" 
                style={{ 
                  fontSize: `${layout.fontSize + 2}px`,
                  marginBottom: `${layout.itemSpacing}px`
                }}
              >
                Experience
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing}px` }}>
                <div className="hover:opacity-90 transition-opacity duration-800">
                  <div className="flex justify-between items-start" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                    <h3 className="font-semibold">Omni RPA Inc</h3>
                    <span className="opacity-50">Jul 2023 - Present</span>
                  </div>
                  <p className="opacity-70" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                    Software Engineer - AI/ML • San Jose, CA
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing/4}px` }}>
                    <li>• Custom agentic AI solutions with LLM agents + Knowledge Graph</li>
                    {layout.showSecondaryInfo && <li>• Modular workflows with domain-specific LLM agents</li>}
                  </ul>
                </div>

                <div className="hover:opacity-90 transition-opacity duration-800">
                  <div className="flex justify-between items-start" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                    <h3 className="font-semibold">Digital University of Kerala</h3>
                    <span className="opacity-50">Oct 2023 - Dec 2023</span>
                  </div>
                  <p className="opacity-70" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                    Research Intern • Thiruvananthapuram, IN
                  </p>
                  <ul>
                    <li>• YOLOv8 computer vision for real-time tomato ripeness detection</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 
                className="font-bold" 
                style={{ 
                  fontSize: `${layout.fontSize + 2}px`,
                  marginBottom: `${layout.itemSpacing}px`
                }}
              >
                Education
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing}px` }}>
                <div className="hover:opacity-90 transition-opacity duration-800">
                  <div className="flex justify-between items-start" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                    <h3 className="font-semibold">Vellore Institute of Technology</h3>
                    <span className="opacity-50">2021 - 2025</span>
                  </div>
                  <p className="opacity-70">B.Tech Computer Science - AI & Machine Learning • Chennai, IN</p>
                </div>

                {layout.showSecondaryInfo && (
                  <div className="hover:opacity-90 transition-opacity duration-800">
                    <div className="flex justify-between items-start" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                      <h3 className="font-semibold">St. Thomas Central School</h3>
                      <span className="opacity-50">2009 - 2021</span>
                    </div>
                    <p className="opacity-70">AISSCE - PCM with CS • Thiruvananthapuram, IN</p>
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 
                className="font-bold" 
                style={{ 
                  fontSize: `${layout.fontSize + 2}px`,
                  marginBottom: `${layout.itemSpacing}px`
                }}
              >
                Skills
              </h2>
              <div 
                className="grid gap-2"
                style={{ 
                  gridTemplateColumns: layout.gridCols > 1 ? 'repeat(2, 1fr)' : '1fr',
                  gap: `${layout.itemSpacing}px`
                }}
              >
                <div className="hover:opacity-90 transition-opacity duration-900">
                  <span className="opacity-50">Programming:</span> Python, C++, Java, SQL
                </div>
                <div className="hover:opacity-90 transition-opacity duration-900">
                  <span className="opacity-50">AI/ML:</span> TensorFlow, PyTorch, LLMs, Computer Vision
                </div>
                <div className="hover:opacity-90 transition-opacity duration-900">
                  <span className="opacity-50">Cloud:</span> AWS, Azure (AZ-104), GCP, BigQuery
                </div>
                <div className="hover:opacity-90 transition-opacity duration-900">
                  <span className="opacity-50">Tools:</span> Docker, Git, Flask, GraphDBs
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="flex-1 overflow-hidden">
              <h2 
                className="font-bold" 
                style={{ 
                  fontSize: `${layout.fontSize + 2}px`,
                  marginBottom: `${layout.itemSpacing}px`
                }}
              >
                Projects
              </h2>
              
              <div 
                className="grid h-full overflow-hidden"
                style={{ 
                  gridTemplateColumns: `repeat(${layout.gridCols}, 1fr)`,
                  gap: `${layout.itemSpacing}px`
                }}
              >
                {displayedProjects.map((project, index) => (
                  <div key={index} className="hover:opacity-90 transition-opacity duration-1000">
                    <h3 className="font-semibold" style={{ marginBottom: `${layout.itemSpacing/2}px` }}>
                      {project.title}
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing/4}px` }}>
                      {project.items.slice(0, layout.showSecondaryInfo ? 3 : 1).map((item, itemIndex) => (
                        <li key={itemIndex} className="opacity-80">• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 overflow-hidden">
            <div 
              className="sticky top-4" 
              style={{ display: 'flex', flexDirection: 'column', gap: `${layout.sectionSpacing}px` }}
            >
              
              {/* Quick contact */}
              <div>
                <h3 className="font-bold opacity-50" style={{ marginBottom: `${layout.itemSpacing}px` }}>CONTACT</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing/2}px` }}>
                  <a 
                    href="mailto:karthikvinayan57@gmail.com"
                    className="hover:opacity-80 transition-opacity duration-700 cursor-pointer"
                  >
                    karthikvinayan57@gmail.com
                  </a>
                  <div>Hyderabad, IN</div>
                  <a
                    href="https://linkedin.com/in/karthik-vinayan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity duration-700 cursor-pointer"
                  >
                    linkedin.com/in/karthik-vinayan
                  </a>
                </div>
              </div>

              {/* Skills overview */}
              <div>
                <h3 className="font-bold opacity-50" style={{ marginBottom: `${layout.itemSpacing}px` }}>STACK</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing/2}px` }}>
                  <div>Python • C++ • Java • SQL</div>
                  <div>TensorFlow • PyTorch • LLMs</div>
                  <div>AWS • Azure • GCP</div>
                  <div>Docker • Git • Flask</div>
                </div>
              </div>

              {/* Current status */}
              <div>
                <h3 className="font-bold opacity-50" style={{ marginBottom: `${layout.itemSpacing}px` }}>STATUS</h3>
                <div>
                  <div style={{ marginBottom: `${layout.itemSpacing/2}px` }}>Software Engineer - AI/ML</div>
                  <div className="opacity-60">@ Omni RPA Inc</div>
                  <div className="opacity-40" style={{ marginTop: `${layout.itemSpacing}px` }}>Jul 2023 - Present</div>
                </div>
              </div>

              {/* Education quick */}
              <div>
                <h3 className="font-bold opacity-50" style={{ marginBottom: `${layout.itemSpacing}px` }}>EDUCATION</h3>
                <div>
                  <div style={{ marginBottom: `${layout.itemSpacing/2}px` }}>VIT Chennai</div>
                  <div className="opacity-60">B.Tech CS - AI/ML</div>
                  <div className="opacity-40">2021 - 2025</div>
                </div>
              </div>

              {layout.showSecondaryInfo && (
                <>
                  {/* Recent work */}
                  <div>
                    <h3 className="font-bold opacity-50" style={{ marginBottom: `${layout.itemSpacing}px` }}>RECENT</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing}px` }}>
                      <div>
                        <div style={{ marginBottom: `${layout.itemSpacing/2}px` }}>LLM Agent Workflows</div>
                        <div className="opacity-60">NebulaGraph + contextual adaptation</div>
                      </div>
                      <div>
                        <div style={{ marginBottom: `${layout.itemSpacing/2}px` }}>Computer Vision</div>
                        <div className="opacity-60">YOLOv8 tomato detection</div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="font-bold opacity-50" style={{ marginBottom: `${layout.itemSpacing}px` }}>CERTS</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: `${layout.itemSpacing/2}px` }}>
                      <div>Azure AZ-104</div>
                      <div>AWS Solutions Architect</div>
                      <div>TensorFlow Developer</div>
                      <div>Google Cloud Professional</div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div 
      className={`h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{
        opacity: isInitialized ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out'
      }}
    >
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  )
}