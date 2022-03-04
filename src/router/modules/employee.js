import Layout from '@/layouts'

const employee = {
  path: '/employees',
  component: Layout,
  name: 'employees',
  redirect: '/employees/index',
  children: [
    {
      path: '/employees/index',
      component: () => import('@/views/employee/index'),
      name: 'employees.index',
      meta: { title: 'Employee'}
    },
  ]
}

export default employee