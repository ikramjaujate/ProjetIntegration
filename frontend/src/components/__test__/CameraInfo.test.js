import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' 
import 'jest-styled-components'
import CameraInfo from '../CameraInfo.js' ;
Enzyme.configure({ adapter: new Adapter() })


describe('CameraInfo', () => {
    it('Vérifier le nom de la camera passé en paramètre. ', () => {
      const wrapper = shallow(<CameraInfo name="Lounge" allowed="" notification=""/>)
      const paragraph = wrapper.find('div.name-camera-grade')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.text()).toEqual('Lounge')
    })

    it('Vérifier que le booleen passé en param dans allowed renvoie le bon backgroud (1er condition).', () => {
      const wrapper = shallow(<CameraInfo name="" allowed={false}  notification=""/>)
      const paragraph = wrapper.find('div.bg-notification')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.prop('style')).toHaveProperty("backgroundColor","var(--camera-refuse)")
    })

    it('Vérifier que le booleen passé en param dans allowed renvoie le bon backgroud (2eme condition).', () => {
        const wrapper = shallow(<CameraInfo name="" allowed={true} notification=""/>)
        const paragraph = wrapper.find('div.bg-notification')
        expect(paragraph).toHaveLength(1)
        expect(paragraph.prop('style')).toHaveProperty("backgroundColor","var(--camera-allow)")
    })

    it('Vérifier que le booleen passé en param dans notification renvoie la bonne couleur (1ere condition).', () => {
        const wrapper = shallow(<CameraInfo name="" allowed={false} notification={true}/>)
        const paragraph = wrapper.find('i')
        expect(paragraph).toHaveLength(1)
        expect(paragraph.prop('style')).toHaveProperty("color","white")
    })

    it('Vérifier que la couleur passé en param dans notification renvoie la bonne couleur (2eme condition).', () => {
        const wrapper = shallow(<CameraInfo name="" allowed={true} notification={false}/>)
        const paragraph = wrapper.find('i')
        expect(paragraph).toHaveLength(1)
        expect(paragraph.prop('style')).toHaveProperty("color","var(--camera-allow)")
    })

    it('Vérifier que la couleur passé en param dans notification renvoie la bonne couleur (3eme condition).', () => {
        const wrapper = shallow(<CameraInfo name="" allowed={false} notification={false}/>)
        const paragraph = wrapper.find('i')
        expect(paragraph).toHaveLength(1)
        expect(paragraph.prop('style')).toHaveProperty("color","var(--camera-refuse)")
    })  
})
