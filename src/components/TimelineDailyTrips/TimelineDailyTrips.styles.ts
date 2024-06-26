import styled from "@emotion/styled";
import { colors } from "@mui/material";

export const TimelineItem = styled.div<{
  isStop: boolean;
  selected: boolean;
}>`
  color: #ffffff;
  background-color: transparent !important;
  border: 0 !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  margin-top: ${(props) => {
    if (props.isStop) return "-3px";
    return "0px";
  }};
`;

export const TimelineItemSubtitle = styled.div`
  color: black;
  padding: 0 2px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 10px;
  line-height: 10px;
  gap: 5px;
  height: 14px !important;
`;

export const TimelineItemLocation = styled.span`
  overflow: hidden;
  white-space: nowrap;
  padding: 2px 4px;
  border-radius: 4px;
`;

export const TimelineItemOrigin = styled(TimelineItemLocation)`
  background-color: ${colors.blue[100]};
`;

export const TimelineItemDestination = styled(TimelineItemLocation)`
  background-color: ${colors.deepOrange[100]};
`;

export const TimelineItemTitle = styled.div<{
  isStop: boolean;
}>`
  overflow: hidden;
  padding-left: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-style: solid;
  border-width: 1px;
  border-radius: ${(props) => (props.isStop ? "0 4px 4px 0" : "4px")};
  border-left-width: 1px;
  border-right-width: 1px;
  display: flex;
  align-items: center;
  height: ${(props) => {
    if (props.isStop) return "5px";
    return "12px";
  }};
`;
