import React, {Component} from 'react';
import Group from './components/Group';
import {Button} from 'react-bootstrap';
import './App.css';
import data from './data/data';

class App extends Component {
    state = {
        data: data,
        sizes: [],
        colors: [],
        locks: [],
        color: '',
        size: '',
        lock: ''
    };
    buildView = () => {
        const dataMod = this.state.data;
        let colors = dataMod.map(elem => ({item: elem.Color, visible: 'info'}));
        let sizes = dataMod.map(elem => ({item: elem.Size, visible: 'info'}));
        let locks = dataMod.map(elem => ({item: elem.Lock, visible: 'info'}));
        this.setState({
            colors: this.getArrayUnik(colors),
            sizes: this.getArrayUnik(sizes),
            locks: this.getArrayUnik(locks)

        });

    };
    getArrayUnik = (arr) => {
        let newArr = arr.sort(function (a, b) {
            return ((a.item + a.disable) < (b.item + b.disable)) ? -1 : 1;
        }).reduce(function (arr, el) {
            if (!arr.length || arr[arr.length - 1].item !== el.item) {
                arr.push(el);
            }
            return arr;
        }, []);

        return newArr;

    };
    componentDidMount = () => {
        this.buildView();
    };

    handleClickButton = (type, value) => {
        let dataMod = {...this.state};
        dataMod[type] = value;
        //console.log(dataMod);


        // let sizes = dataMod.map(elem => ({item: elem.Size, visible: 'info'}));
        // let locks = dataMod.map(elem => ({item: elem.Lock, visible: 'info'}));
        //Заполнение цвета

        let colors = dataMod.data.map(elem => {
            let rez = {item: elem.Color, visible: 'info', disable: false};
            if (dataMod.color !== '' && dataMod.color === elem.Color) {
                rez.visible = 'success';
            }
            if (dataMod.size !== '') {

                rez.disable = elem.Size !== dataMod.size;
            }
            if (!rez.disable && dataMod.lock !== '') {
                console.log(elem.Lock, dataMod.lock);
                rez.disable = elem.Lock !== dataMod.lock;
            }
            return rez;
        });
        dataMod.colors = [...this.getArrayUnik(colors)];

        //Заполнение размера
        let sizes = dataMod.data.map(elem => {
            let rez = {item: elem.Size, visible: 'info', disable: false};
            if (dataMod.size !== '' && dataMod.size === elem.Size) {
                rez.visible = 'success';
            }
            if (dataMod.color !== '') {
                console.log(elem);
                rez.disable = elem.Color !== dataMod.color;
            }
            if (!rez.disable && dataMod.lock !== '') {
                console.log(elem.Lock, dataMod.lock);
                rez.disable = elem.Lock !== dataMod.lock;
            }
            return rez;
        });
        console.log(sizes);
        dataMod.sizes = [...this.getArrayUnik(sizes)];
        //Заполнение замка
        let locks = dataMod.data.map(elem => {
            let rez = {item: elem.Lock, visible: 'info', disable: false};
            if (dataMod.lock !== '' && dataMod.lock === elem.Lock) {
                rez.visible = 'success';
            }
            if (dataMod.color !== '') {

                rez.disable = elem.Color !== dataMod.color;
            }
            if (!rez.disable && dataMod.lock !== '') {
                console.log(elem.Lock, dataMod.lock);
                rez.disable = elem.Lock !== dataMod.lock;
            }
            return rez;
        });
        dataMod.locks = [...this.getArrayUnik(locks)];

        this.setState(dataMod);

    };

    reset = () => {
        this.setState({
            color: '',
            size: '',
            lock: ''
        });
        this.buildView();
    };

    render() {
        return (
            <div className="container App">
                <Group title={'Размер'} data={this.state.sizes} type={'size'} click={this.handleClickButton}/>
                <Group title={'Цвет'} data={this.state.colors} type={'color'} click={this.handleClickButton}/>
                <Group title={'Замок'} data={this.state.locks} type={'lock'} click={this.handleClickButton}/>
                <Button bsStyle='warning' onClick={this.reset}>
                    Reset
                </Button>
            </div>
        );
    }
}

export default App;
