import { DOMWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ModuleList from '../ModuleList.vue'

import modules from '@/utils/modules.json'

describe('ModuleList', () => {
  let wrapper = new DOMWrapper()
  beforeEach(() => {
    wrapper = mount(ModuleList, {
      props: {
        group: 'elec',
        modules: modules,
      },
    })
  })
  it('afficher les modules', () => {
    expect(wrapper.exists()).toBeTruthy()

    const moduleWrapper = wrapper.findAllComponents('[test-id="test_mi"]')
    expect(moduleWrapper).toHaveLength(8)

    // dashboard
    expect(moduleWrapper[0].props('group')).toEqual('elec')
    expect(moduleWrapper[0].props('moduleValue')).toEqual(modules[0])
  })
})
