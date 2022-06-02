import React from "react";
import { MemorizedTable } from "../components/table/Table";
import styles from "../styles/App.module.scss";
import { user } from "../type";
import axios from "axios";
import { MemorizedAddItem } from "../components/addItem/AddItem";

function Dashboard() {
  const [datas, setDatas] = React.useState<user[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [test, setTest] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<number>(1);
  const [searchWord, setSearchword] = React.useState<string>("");
  console.log("render App");
  //Create layout
  React.useEffect(() => {
    console.log("Effect Fecthing");
    const fetchData = async () => {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const users = data.data as user[];
      setDatas(users);
    };
    fetchData();
  }, []);

  const filterData = React.useMemo(() => {
    const new_data = datas.filter((data, index) => {
      console.log("filter going on");
      return data.title.includes(searchWord);
    });
    if (sort === 1) {
      return new_data.sort((a, b) => b.userId - a.userId);
    } else if (sort === 2) {
      return new_data.sort((a, b) => {
        return ("" + a.title).localeCompare(b.title);
      });
    } else {
      return new_data.sort((a, b) => b.id - a.id);
    }
  }, [datas, searchWord, sort]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <MemorizedAddItem setDatas={setDatas} />
      </div>
      <div className={styles.searchBoard}>
        <div className={styles.control}>
          <div className={styles.left}>
            Sort{" "}
            <select onChange={(e) => setSort(parseInt(e.target.value))}>
              <option value={1}>Sort by UserId</option>
              <option value={2}>Sort by Title</option>
              <option value={3}>Sort by Id</option>
            </select>
            <button className="button-9" onClick={() => setTest(true)}>
              Test Render
            </button>
          </div>
          <div className={styles.right}>
            Search
            <input onChange={(e) => setSearchword(e.currentTarget.value)} />
            {/* <button className="button-9" onClick={(e) => handleSearch(e)}>
              Search
            </button> */}
          </div>
        </div>
        <div className={styles.table}>
          <MemorizedTable users={filterData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
