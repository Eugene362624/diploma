import React from 'react'
import SettingsPage from './pages/Menu/Settings/SettingsPage'
import AdminPage from './pages/Admin/AdminPage/AdminPage'
import EditTestsPage from './pages/Admin/EditTestsPage/EditTestsPage'
import { Route, Routes } from 'react-router-dom'
import InteractiveLayout from './layouts/InteractiveLayout'
import TestDescriptionPage from './pages/Menu/Tests/TestDescriptionPage/TestDescriptionPage'
import TheoryPage from './pages/Menu/Theory/TheoryPage/TheoryPage'
import MenuLayout from './layouts/MenuLayout'
import HomePage from './pages/Menu/Home/HomePage'
import TestsListPage from './pages/Menu/Tests/TestsListPage/TestsListPage'
import TheoryListPage from './pages/Menu/Theory/TheoryListPage/TheoryListPage'
import ExercisesListPage from './pages/Menu/Exercises/ExercisesListPage/ExercisesListPage'
import ExercisesPage from './pages/Menu/Exercises/ExercisesPage/ExercisesPage'
import EditTheoryPage from './pages/Admin/EditTheoryPage/EditTheoryPage'
import EditExercisesPage from './pages/Admin/EditExercisesPage/EditExercisesPage'

const mainRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    index: false,
    path: 'settings',
    element: <SettingsPage />,
  },
  {
    index: false,
    path: 'tests',
    element: <TestsListPage />,
  },
  {
    index: false,
    path: 'theory',
    element: <TheoryListPage />,
  },
  {
    index: false,
    path: 'exercises',
    element: <ExercisesListPage />,
  },
]

const adminRoutes = [
  {
    index: true,
    element: <AdminPage />,
  },
  {
    index: false,
    path: 'tests',
    element: <EditTestsPage />,
  },
  {
    index: false,
    path: 'theory',
    element: <EditTheoryPage />,
  },
  {
    index: false,
    path: 'exercises',
    element: <EditExercisesPage />,
  },
]

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MenuLayout />}>
        {mainRoutes.map((e, i: number) => {
          return (
            <Route key={i} index={e.index} path={e.index ? null : e.path} element={e.element} />
          )
        })}
      </Route>
      <Route path='admin' element={<MenuLayout />}>
        {adminRoutes.map((e, i: number) => {
          return (
            <Route key={i} index={e.index} path={e.index ? null : e.path} element={e.element} />
          )
        })}
      </Route>
      <Route path='test' element={<InteractiveLayout />}>
        <Route path=':id' element={<TestDescriptionPage />} />
      </Route>
      <Route path='exercise' element={<InteractiveLayout />}>
        <Route path=':id' element={<ExercisesPage />} />
      </Route>
      <Route path='theories' element={<InteractiveLayout />}>
        <Route path=':id' element={<TheoryPage />} />
      </Route>
    </Routes>
  )
}
