import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import React from "react";
import { Card, CircularProgress, Divider, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { generateTrip } from "../../../API/ApiClient";

export default function CT_Generate(props) {

    const { tripData, onThinking, onResult } = props;

    const [loading, setLoading] = React.useState(true);
    const [thinking, setThinking] = React.useState("");
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(null);

    const thinkingContainerRef = React.useRef(null);

    const handleGenerate = async () => {
        setLoading(true);
        setThinking("");
        setResult(null);
        setError(null);

        try {
            await generateTrip(
                tripData,
                (chunk) => {
                    setThinking(prev => prev + chunk);
                    onThinking?.(chunk);
                },
                (finalResult) => {
                    setResult(finalResult);
                    onResult?.(finalResult);
                }
            );
        } catch (err) {
            console.error("Trip generation failed:", err);
            setError(err.message || "Trip generation failed.");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        handleGenerate();
    }, []);

    React.useEffect(() => {
        const container = thinkingContainerRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [thinking]);

    return (
        <Box sx={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            overflow: "hidden",
            boxSizing: "border-box",
            padding: 1
        }}>
            <Box sx={{
                width: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                p: 1
            }}>
                {/* Header - fixed */}
                <Box sx={{ display: "flex", flexShrink: 0 }}>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: 80 }} />

                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {loading ? "Generating your trip..." : error ? "Generation failed" : "Trip generated"}
                        </Typography>

                        <Typography variant="subtitle1" color="textSecondary">
                            {loading
                                ? "Watch the thinking process while your trip is generating"
                                : error
                                    ? error
                                    : "Your trip is generated"}
                        </Typography>
                    </Box>
                </Box>

                {/* Scrollable content */}
                <Box sx={{
                    display: "flex",
                    flex: 1,
                    minHeight: 0,
                    flexDirection: "column",
                    overflowY: "auto",
                    overflowX: "hidden",
                    mt: 2
                }}
                    ref={thinkingContainerRef}
                    className="hide-scrollbar"
                >
                    {loading ? (
                        <Box sx={{
                            display: "flex",
                            flex: 1,
                            minHeight: 0,
                            minWidth: 0,
                            flexDirection: "column",
                            overflow: "hidden",
                            mt: 2
                        }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", flexShrink: 0 }}>
                                AI Thinking Process
                            </Typography>

                            <Box
                                ref={thinkingContainerRef}
                                sx={{
                                    flex: 1,
                                    minHeight: 0,
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                    overscrollBehavior: "contain",
                                    pr: 1
                                }}
                                className="hide-scrollbar"
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace: "pre-wrap",
                                        overflowWrap: "anywhere"
                                    }}
                                >
                                    {thinking || "Waiting for AI..."}
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 1,
                                flexShrink: 0
                            }}>
                                <CircularProgress size={18} />
                                <Typography variant="caption" color="textSecondary">
                                    AI is working...
                                </Typography>
                            </Box>
                        </Box>
                    ) : error ? (
                        <Typography color="error">
                            {error}
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Generated Itinerary
                            </Typography>

                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                {typeof result === "string"
                                    ? result
                                    : JSON.stringify(result, null, 2)}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}