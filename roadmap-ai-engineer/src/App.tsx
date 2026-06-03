import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AITutorPage } from './pages/AITutorPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { RoadmapPage } from './pages/RoadmapPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RoadmapPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/ai-tutor" element={<AITutorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
