import userSlice from "./userSlice";
import catalogSlice from "./catalogSlice";
import playSlice from "./playSlice";
import editSlice from "./editSlice";
import statisticSlice from "./statisticSlice";

const Slices = {
  ...userSlice.actions,
  ...catalogSlice.actions,
  ...playSlice.actions,
  ...editSlice.actions,
  ...statisticSlice.actions
}

export default Slices;