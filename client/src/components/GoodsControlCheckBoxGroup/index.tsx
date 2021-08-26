import {useCallback, useEffect, useMemo, useState} from "react";
import {Checkbox, Divider, Layout} from 'antd';

const CheckboxGroup = Checkbox.Group;
const {Content} = Layout;

const GoodsControlCheckBoxGroup = ({onChange, menus}) => {
    const [checkBoxList, setCheckBoxList] = useState([]);  // 所有checkbox的状态

    // 初始化checkBoxList状态：处理获取到的数据，转换成checkBoxGroupList所需要的数据格式，用于组件渲染以及checkBoxGroupList状态改变的hook
    useEffect(() => {
        let _checkBoxList = [];
        for (const i in menus) {
            // menus 单个对象接口
            const {menuName, subMenu} = menus[i];

            // checkBoxDTO：checkbox初始化数据格式
            // checkBoxDTO = [
            //   {
            //      menuName: string,
            //      indeterminate: boolean,
            //      checked: boolean,
            //      subMenu: {menuName: string, checked: boolean}[]
            //   },
            //   ......
            // ]
            let checkBoxDTO = {
                menuName,
                checked: false,
                indeterminate: false,
                subMenu: []
            };

            // 循环subMenu
            for (const j in subMenu) {
                let checkBoxGroupDTO = {
                    menuName: subMenu[j].menuName,
                    checked: false
                }

                // 设置checkBoxGroup初始状态
                checkBoxDTO.subMenu.push(checkBoxGroupDTO)
            }

            if (subMenu && subMenu.length !== 0) {
                // 数据格式完成后，push到初始化数组
                _checkBoxList.push(checkBoxDTO);
            }

        }

        // 初始化所有checkbox的状态
        setCheckBoxList(_checkBoxList)
    }, []);

    // 全选按钮的勾选状态
    const checkAll = useMemo(() => {
        // 根据最新的checkBoxList状态，更改checkAll
        const isAll = checkBoxList.every(c => c.checked === true) && checkBoxList.every(c => c.indeterminate === false);
        const isAtLeastOne = checkBoxList.some(c => c.indeterminate === true) || checkBoxList.some(c => c.checked === false);
        const isNot = checkBoxList.every(c => c.checked === false) && checkBoxList.every(c => c.indeterminate === false);

        // 全选
        if (isAll) {
            return true;
        }

        // 至少有个勾选 && 不是全选
        if (isAtLeastOne && !isAll) {
            return false;
        }

        // 没有选中任何一个
        if (isNot) {
            return false;
        }

        return false;
    }, [checkBoxList])

    // 全选按钮的模糊状态
    const indeterminate = useMemo(() => {
        let isAll = checkBoxList.every(c => c.checked === true);
        let isNot = checkBoxList.every(c => c.checked === false) && checkBoxList.every(c => c.indeterminate === false);

        // 全选的时候，模糊度：false
        if (isAll) {
            return false
        }

        // 没有勾选任何一个的时候， 模糊度：false
        if (isNot) {
            return false
        }

        // 其他情况（至少勾选一个的情况下，模糊度：true）
        return true;
    }, [checkBoxList]);

    // 判断 ：checkBoxGroup 和 checkBox 至少有一个勾选
    const isAtLeastOneCheckBox = useMemo(() => {
        return checkBoxList.some(c => c.indeterminate === true) || checkBoxList.some(c => c.checked === true);
    }, [checkBoxList])

    // 点击全选按钮回调
    const onChangeAll = e => {
        // 过渡状态，用于替换源状态
        let _checkBoxList = checkBoxList;

        // 点击全选按钮之前，一共有2种old状态

        // 1. 全选已被勾选中
        if (checkAll) {
            // 修改为：全选取消
            _checkBoxList.forEach(b => {
                b.checked = false;
                b.indeterminate = false;
                b.subMenu.forEach(s => {
                    s.checked = false;
                })
            })
        }

        // 2. 全选没有被勾选
        if (!checkAll) {
            // isAtLeastOneCheckBox: checkBox 和 checkBoxGroup 至少有一个被勾选
            if (isAtLeastOneCheckBox) {
                // 修改为：全选勾选
                _checkBoxList.forEach(b => {
                    b.checked = true;
                    b.indeterminate = false;
                    b.subMenu.forEach(s => {
                        s.checked = true;
                    })
                })
            } else {
                // 修改为： 全选选中
                _checkBoxList.forEach(b => {
                    b.checked = true;
                    b.indeterminate = false;
                    b.subMenu.forEach(s => {
                        s.checked = true;
                    })
                })
            }
        }

        // 变更新状态
        setCheckBoxList([..._checkBoxList]);

        // 抛出事件
        onChangeCallback();
    }

    /**
     * clickBoxAll 点击checkBox按钮的回调
     * @param e checkBox的最新数据
     * @param menu 对应checkBox的相关状态数据
     * @param indeterminate checkBox的可模糊状态，用于判断checkBoxGroup的选中情况
     * @param checked checkBox的选中状态
     * @param i 当前checkBox处于checkBoxList的第几位
     */
    const clickCheckBox = (e, menu, indeterminate, checked, i) => {
        // 缓存状态，用于后续替换
        const newCheckedList = checkBoxList;

        // 当点击checkBox按钮时，根据三种不同情况做以下处理：

        // 1. 点击checkBox按钮之前，checkBox的checked = false  && checkBoxGroup也没有被选中的情况下 indeterminate : false
        // 点击结果： 当前的checkbox以及checkBoxGroup会被全部勾选
        if (!indeterminate && !checked) {
            menu.subMenu.forEach(m => {
                m.checked = true;
            });
        }

        // 2. 点击checkBox按钮之前。checkBox的checked = true ，checkBoxGroup全部被选中的情况下  indeterminate : false
        // 点击结果： 当前的checkbox以及checkBoxGroup 全部取消勾选
        if (checked && !indeterminate) {
            menu.subMenu.forEach(m => {
                m.checked = false;
            });
        }

        // 3. 点击checkBox按钮之前。checkBox的checked = false ，checkBoxGroup至少有一个被选中的情况下 ,indeterminate = true
        // 点击结果： 当前的checkbox以及checkBoxGroup，全部勾选
        if (indeterminate && !checked) {
            menu.subMenu.forEach(m => {
                m.checked = true;
            });
        }

        // 4. 更改checkbox的checked和可模糊值
        menu.checked = e.target.checked;
        menu.indeterminate = false;

        // 替换相对应的群组
        newCheckedList[i] = menu;

        // 更改状态
        setCheckBoxList([...newCheckedList]);

        // 抛出事件给父组件
        onChangeCallback();
    }

    /**
     * 点击 checkBoxGroup 的回调函数
     * @param e {string[]} 当前checkBoxGroup最新选中的数组, 例如["商品管理", "商品分类"]
     * @param menu 对应checkBox的相关状态数据
     * @param subMenu checkBoxGroup的数据
     * @param subMenuName checkBoxGroup的 menuName数组
     * @param i 当前checkBox处于checkBoxList的第几位
     */
    const clickCheckBoxGroup = (e, menu, subMenu, subMenuName, i) => {
        // 缓存状态，用于后续替换
        const newCheckedList = checkBoxList;

        // 1. checkBoxGroup全部取消选中
        subMenu.forEach(sub => {
            sub.checked = false;
        })

        // 2. 再设置选中状态
        // e 为当前最新选中的数组,例如 ["商品管理", "商品分类"]
        e.forEach(m => {
            let index = subMenuName.indexOf(m);
            if (index !== -1) {
                subMenu[index].checked = true;
            }
        })

        // 3. 判断checkBoxGroup的选中情况，修改checkBox的checked属性
        menu.checked = subMenu.length !== 0 && subMenu.every(sub => sub.checked === true);

        // 4. 判断checkBoxGroup至少选中一个，但不能全部选中的情况，
        menu.indeterminate = subMenu.some(sub => sub.checked === true) && (subMenu.length !== 0 && !subMenu.every(sub => sub.checked === true));

        // 5. 替换缓存状态
        newCheckedList[i] = menu;

        // 6. 更改状态
        setCheckBoxList([...newCheckedList]);

        // 抛出事件
        onChangeCallback();
    }

    // 状态改变的回调，用于抛出事件给父组件
    const onChangeCallback = useCallback(() => {
        onChange && onChange(checkBoxList)
    }, [checkBoxList])

    // 根据数据渲染的布局组件，用于checkBox编辑。
    const checkboxGroupLayout = useMemo(() => {
        // 循环checkBox
        return checkBoxList.map((menu, i) => {

            // 获取checkBox相对应的subMenu、checked、menuName
            let {subMenu, checked, menuName, indeterminate} = menu;

            // checkBox的全选可模糊状态： checkBoxGroup全选或者不全选，不可模糊 -> false || checkBoxGroup至少选中一个，可模糊 -> true
            indeterminate = subMenu.some(sub => sub.checked === true) && (subMenu.length !== 0 && !subMenu.every(sub => sub.checked === true));

            // checkBoxGroup数组（只有menuName）
            const checkBoxGroupMenuName = subMenu.map(sub => sub.menuName);

            // checkBoxGroup数组（当checked === true 的 menuName）
            const checkBoxGroupCheckedMenuName = subMenu.filter(sub => sub.checked === true).map(sub => sub.menuName);

            return (
                <div key={i}>
                    <Content>
                        {/** checkBox **/}
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={checked}
                            onChange={(e) => clickCheckBox(e, menu, indeterminate, checked, i)}
                        >
                            {menuName}
                        </Checkbox>
                    </Content>
                    <br/>
                    {/** checkBoxGroup **/}
                    <CheckboxGroup
                        options={checkBoxGroupMenuName}
                        value={checkBoxGroupCheckedMenuName}
                        onChange={e => clickCheckBoxGroup(e, menu, subMenu, checkBoxGroupMenuName, i)}/>
                    <Divider/>
                </div>
            )
        });
    }, [checkBoxList]);

    return (
        <div>
            <Checkbox
                checked={checkAll}
                indeterminate={indeterminate}
                onChange={onChangeAll}
            >
                全部
            </Checkbox>
            <Divider/>
            {/** 商品菜单编辑 **/}
            {checkboxGroupLayout}
        </div>
    )
}

export default GoodsControlCheckBoxGroup;
