import React from 'react';
import GoodsControlCheckBoxGroup from "../components/GoodsControlCheckBoxGroup";
import menu from "./menu.json";

const menus = menu.data.menus; // 模拟的menus数据
const Group = () => {
    return (
        <div>
            <GoodsControlCheckBoxGroup
                menus={menus}
                onChange={(e) => {
                    console.log("最新数据", e);
                }}/>
        </div>
    );
};

export default Group;
