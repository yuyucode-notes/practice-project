import type {NextPage} from 'next'
import styles from '../../styles/Home.module.css'
import GoodsControlCheckBoxGroup from "../components/GoodsControlCheckBoxGroup";
import menu from "./menu.json";
const menus = menu.data.menus; // 模拟的menus数据
const Home: NextPage = () => {

    return (
        <div className={styles.container}>
            <GoodsControlCheckBoxGroup />
        </div>
    )
}


export default Home
