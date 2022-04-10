import Link from "next/link";
import styles from "./button.module.css";

function Button(props) {
  return (
    <Link href={props.Link}>
      <a className={styles.btn}>{props.children}</a>
    </Link>
  );
}

export default Button;
