import RobotArmViewer from './components/RobotArmViewer'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Robot Kinematics Visualiser
      </h1>
      <RobotArmViewer />
    </div>
  )
}

export default App