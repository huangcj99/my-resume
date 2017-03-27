import { Component } from 'react';
import AM from 'amazeui-react';

//组件
const Slider = AM.Slider;

let data = [
    {
        img: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
        desc: '这是标题标题标题标题标题标题标题0'
    },
    {
        img: 'http://s.amazeui.org/media/i/demos/bing-2.jpg',
        desc: '这是标题标题标题标题标题标题标题1'
    },
    {
        img: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
        desc: '这是标题标题标题标题标题标题标题2'
    }
];

export default class Recommond extends Component {
    render () {
        return (
            <div>
                <Slider>
                    {data.map(function(item, i) {
                        return (
                            <Slider.Item key={i}>
                                <img src={item.img} />
                                <div className="am-slider-desc">
                                    {item.desc}
                                </div>
                            </Slider.Item>
                        );
                    })}
                </Slider>
            </div>
        )
    }
}