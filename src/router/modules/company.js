import Layout from '@/layouts'

const company = {
  path: '/companies',
  component: Layout,
  name: 'companies',
  redirect: '/companies/index',
  children: [
    {
      path: '/companies/index',
      component: () => import('@/views/company/index'),
      name: 'companies.index',
      meta: { title: 'Companies'}
    },
    {
      path: '/companies/company',
      component: () => import('@/views/company/company'),
      name: 'companies.company',
      meta: { title: 'Company'}
    },
  ]
}

export default company