import { DOMWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ModuleItem from '../ModuleItem.vue'

describe('ModuleItem', () => {
  let wrapper = new DOMWrapper()
  const modules = [
    {
      name: 'dashboard',
      title: 'Tableau de bord',
      descriptions: ['Test description 1', 'Test description 2', 'Test description 3'],
    },
  ]
  beforeEach(() => {
    wrapper = mount(ModuleItem, {
      props: {
        moduleValue: {
          ...modules[0],
        },
      },
    })
  })
  it("afficher le text et l'icon au chargement", () => {
    expect(wrapper.exists()).toBeTruthy()

    const iconTitleWrapper = wrapper.find('[test-id="test_miit"]')
    expect(iconTitleWrapper.exists()).toBe(true)
    expect(iconTitleWrapper.find('img').exists()).toBe(true)
    expect(iconTitleWrapper.find('p').text()).toContain('Tableau de bord')

    const descriptionsWrapper = wrapper.findAll('[test-id="test_mid"]')
    expect(descriptionsWrapper).toHaveLength(3)

    expect(descriptionsWrapper[0].text()).toEqual('Test description 1')
    expect(descriptionsWrapper[1].text()).toEqual('Test description 2')
    expect(descriptionsWrapper[2].text()).toEqual('Test description 3')
  })

  it("emettre l'evenement au click dans tous les elements de l'item", async () => {
    expect(wrapper.exists()).toBeTruthy()

    const iconTitleWrapper = wrapper.find('[test-id="test_miit"]')

    await iconTitleWrapper.trigger('click')

    const emitted = wrapper.emitted('moduleItemShow')
    expect(emitted).toHaveLength(1)
  })
})
