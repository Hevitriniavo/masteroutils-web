import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ModuleIcon from '../ModuleIcon.vue'

describe('ModuleIcon', () => {
  it("afficher l'icon en fonction du name", () => {
    const wrapper = mount(ModuleIcon, {
      props: {
        name: 'dashboard',
      },
    })
    expect(wrapper.exists()).toBeTruthy()

    const iconWrapper = wrapper.find('img')
    expect(iconWrapper.exists()).toBe(true)
    expect(iconWrapper.attributes('src')).toBe('/src/assets/images/icones/dashboard.png')
  })
})
