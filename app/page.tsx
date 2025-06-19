'use client'

import { useState } from 'react'

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-2xl mx-auto px-6 py-12 font-mono">
        
        {/* Theme toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="fixed top-6 right-6 text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          {isDark ? 'light' : 'dark'}
        </button>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-bold mb-2">Karthik Vinayan</h1>
          <p className="opacity-70">Software Engineer - AI/ML</p>
          <p className="opacity-50 text-sm">Currently @ Omni RPA Inc</p>
        </header>

        {/* Contact */}
        <section className="mb-12">
          <div className="space-y-1 text-sm">
            <div>
              <span className="opacity-50">email:</span> karthikvinayan57@gmail.com
            </div>
            <div>
              <span className="opacity-50">location:</span> Hyderabad, IN
            </div>
            <div>
              <span className="opacity-50">linkedin:</span> linkedin.com/in/karthik-vinayan
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-6">Experience</h2>
          
          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">Omni RPA Inc</h3>
              <span className="text-sm opacity-50">Jul 2023 - Present</span>
            </div>
            <p className="text-sm opacity-70 mb-2">Software Engineer - AI/ML • San Jose, CA</p>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• Developed custom agentic AI solutions leveraging LLM agents with Knowledge Graph (NebulaGraph)</li>
              <li>• Built modular workflows with domain-specific LLM agents for dynamic retrieval and contextual adaptation</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">Digital University of Kerala</h3>
              <span className="text-sm opacity-50">Oct 2023 - Dec 2023</span>
            </div>
            <p className="text-sm opacity-70 mb-2">Research Intern • Thiruvananthapuram, IN</p>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• Engineered computer vision solution with YOLOv8 for real-time tomato ripeness detection</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-6">Education</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Vellore Institute of Technology</h3>
              <span className="text-sm opacity-50">2021 - 2025</span>
            </div>
            <p className="text-sm opacity-70">B.Tech Computer Science - AI & Machine Learning • Chennai, IN</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">St. Thomas Central School</h3>
              <span className="text-sm opacity-50">2009 - 2021</span>
            </div>
            <p className="text-sm opacity-70">AISSCE - PCM with CS • Thiruvananthapuram, IN</p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="opacity-50">Programming:</span> Python, C++, Java, SQL
            </div>
            <div>
              <span className="opacity-50">AI/ML:</span> TensorFlow, PyTorch, LLMs, Computer Vision
            </div>
            <div>
              <span className="opacity-50">Cloud:</span> AWS, Azure (AZ-104), GCP, BigQuery
            </div>
            <div>
              <span className="opacity-50">Tools:</span> Docker, Git, Flask, GraphDBs
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-lg font-bold mb-6">Projects</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Loan Default Prediction</h3>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• ML model with feature engineering (debt-to-income, credit utilization)</li>
                <li>• Credit risk scoring system for loan approval decisions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Data Engineering Consultant</h3>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• Web scraping pipelines with RESTful APIs using Flask</li>
                <li>• Data cleaning and transformation with Pandas</li>
                <li>• Automated web servers for continuous data updates</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">ADAS Development</h3>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• Raspberry Pi prototype with lane following and object detection</li>
                <li>• Hospital adaptation (pending publication)</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}