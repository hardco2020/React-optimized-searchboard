import { off } from "process";
import React from "react";
import { user } from "../../type";
import styles from "./addItem.module.scss";

type AddItemProp = {
  setDatas: React.Dispatch<React.SetStateAction<user[]>>;
};
const AddItem = ({ setDatas }: AddItemProp) => {
  const [title, setTitle] = React.useState<string>("");
  const [userId, setUserId] = React.useState<number | null>(null);
  const [able, setAble] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("effect able", title, userId);
    if (userId !== null && title !== "") {
      setAble(true);
    } else {
      setAble(false);
    }
  }, [title, userId]);

  console.log("render AddItem");

  const handleAdd = () => {
    if (userId !== null) {
      setDatas((previous) => [
        ...previous,
        { userId, id: previous.length + 1, title, body: "test" },
      ]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.addButton}
        onClick={() => handleAdd()}
        disabled={!able ? true : false}
      >
        Add
      </button>

      <div className={styles.input}>
        <span>Question</span>
        <textarea
          rows={5}
          cols={33}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.input}>
        <span>UserId</span>
        <input
          type="number"
          onChange={(e) => setUserId(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export const MemorizedAddItem = React.memo(AddItem);
