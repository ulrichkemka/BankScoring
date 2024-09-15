import { fireEvent, render, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest'
import { AuthProvider } from '../contexts/auth'
import { SnackBarProvider } from '../contexts/snackbar'
import { User } from '../models/user'
import Users, { loader as usersLoader } from './users'

const API_URL = import.meta.env.VITE_BACKEND_API_URL
const profile: User = {
  email: 'admin@example.com',
  is_active: true,
  is_superuser: true,
  uuid: '6bb9c5ba-e558-4a2a-9a33-22b2f21072d0',
}

const users: Array<User> = [
  {
    email: 'john@example.com',
    is_active: true,
    is_superuser: false,
    uuid: '48f0c771-1d00-4595-b1b4-f2ee060237bc',
  },
  {
    email: 'admin@example.com',
    is_active: true,
    is_superuser: true,
    uuid: '6bb9c5ba-e558-4a2a-9a33-22b2f21072d0',
  },
  {
    email: 'ericsmith@gmail.com',
    is_active: true,
    is_superuser: false,
    first_name: 'Eric',
    last_name: 'Smith',
    uuid: 'd1ba04b9-cd9f-40fe-8956-8a0198f47884',
  },
]

const server = setupServer(
  http.get(API_URL + 'users/me', () => {
    return HttpResponse.json(profile)
  }),
  http.get(API_URL + 'users', () => {
    return HttpResponse.json(users)
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function setup() {
  const user = userEvent.setup()
  const routes = [
    {
      path: '/',
      element: <>Navigated to Home</>,
    },
    {
      path: '/users',
      element: <Users />,
      loader: usersLoader,
    },
  ]

  const router = createMemoryRouter(routes, { initialEntries: ['/users'] })

  const utils = render(
    <AuthProvider>
      <SnackBarProvider>
        <RouterProvider router={router} />,
      </SnackBarProvider>
    </AuthProvider>,
  )

  return {
    ...utils,
    user,
    router,
  }
}


it('should redirect if loader throws error', async () => {
  server.use(
    http.get(API_URL + 'users', () => {
      return HttpResponse.json({ detail: 'Invalid credentials.' }, { status: 401 })
    }),
  )
  const { router } = setup()
  await waitFor(() => expect(router.state.location.pathname).toEqual('/'))
})

