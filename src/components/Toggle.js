import "./ToggleButton.css";
import { themeActions } from "../store/themeReducer";
import { useDispatch, useSelector } from "react-redux";

function ToggleButton() {
  const dispatch = useDispatch();
  const isToggled = useSelector(state => state.theme.theme)
  

  const toggle = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <div className="slider" onClick={toggle}>
      <div className={`circle ${isToggled ? "on" : "off"}`} />
    </div>
  );
}

export default ToggleButton;
