import { MessageState } from "@/store.ts";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export function ArcMessage(state: MessageState) {
  return (
    <Card sx={{ flex: 1, margin: 1.25 }} raised>
      <CardHeader
        title={state.message.reference}
        subheader={state.message.id}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {state.status}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {JSON.stringify(state.message)}
        </Typography>
      </CardContent>
    </Card>
  );
}
