import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Wheel } from "react-custom-roulette";
import "./SpinningWheel.css";
import { toast } from "react-toastify";

const SpinningWheel = () => {
  const [numSlices, setNumSlices] = useState(6);
  const [tempNumSlices, setTempNumSlices] = useState("");
  const [stopAt, setStopAt] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // Generate unique colors for each slice
  const sliceColors = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#FFC300",
    "#C70039",
    "#900C3F",
    "#DAF7A6",
    "#581845",
    "#FF33F6",
    "#33FFF3",
    "#F333FF",
    "#FFD700",
  ];

  //Generate slice data with unique colors
  const data = Array.from({ length: numSlices }, (_, i) => ({
    option: `Gift ${i + 1}`,
    style: {
      backgroundColor: sliceColors[i % sliceColors.length],
      textColor: "white",
    },
  }));

  // Handle wheel click
  const handleWheelClick = () => {
    if (!stopAt || isNaN(stopAt) || stopAt < 1 || stopAt > numSlices) {
      toast.error("Please enter a valid stop position before spinning!");
      return;
    }
    if (isSpinning) return;
    setIsSpinning(true);
  };

  // const handleDialogClose = () => {
  //   if (!numSlices || isNaN(numSlices) || numSlices < 6 || numSlices > 12) {
  //     toast.error("Number of slices must be between 6 and 12!");
  //     return;
  //   }
  //   setIsDialogOpen(false);
  // };

  const handleDialogClose = () => {
    const parsedNum = parseInt(tempNumSlices, 10);
    if (!parsedNum || isNaN(parsedNum) || parsedNum < 6 || parsedNum > 12) {
      toast.error("Number of slices must be between 6 and 12!");
      return;
    }
    setNumSlices(parsedNum);
    setIsDialogOpen(false);
  };

  const handleStopSpinning = () => {
    setIsSpinning(false);
    toast.success(`Congratulations! You won Gift ${stopAt}`);
  };

  return (
    <div className="spinning-wheel-container">
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Enter Number of Slices</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={tempNumSlices}
            onChange={(e) => setTempNumSlices(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Clickable Spinning Wheel */}
      <div className="wheel-container" onClick={handleWheelClick}>
        <Wheel
          mustStartSpinning={isSpinning}
          prizeNumber={stopAt - 1}
          data={data}
          // onStopSpinning={() => setIsSpinning(false)}
          onStopSpinning={handleStopSpinning}
          outerBorderColor="black"
          innerBorderColor="black"
          radiusLineColor="black"
          fontSize={16}
          spinDuration={3.8} // Smooth easing
          startingOptionIndex={0}
          perpendicularText
        />
      </div>
      {/* Stop Position Input */}
      <div className="text-field-container">
        <TextField
          type="number"
          label="Stop at Slice"
          inputProps={{ min: 1, max: numSlices }}
          value={stopAt}
          // onChange={(e) => setStopAt(parseInt(e.target.value) || "")}
          onChange={(e) => {
            const value = parseInt(e.target.value) || "";
            setStopAt(value);
            if (value >= 1 && value <= numSlices) {
              toast.info("Click on the middle to spin the wheel!");
            }
          }}
          fullWidth
          className="stop-input"
        />
      </div>
    </div>
  );
};

export default SpinningWheel;
