import React, { useState } from 'react';
import { StyleSheet, View, Text, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';  

import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject }) => {
    useKeepAwake();
    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);

    const onProgress = (progress) => {
        setProgress(progress);
    }

    const vibrate = () => {
        if (Platform.OS === "ios") {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000);
        } else {
            Vibration.vibrate(10000);
        }
    }

    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
    }

    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);  // reset progress
        setIsStarted(false);  // pause the timer before changing the time
    }

    const onStart = () => {
        setIsStarted(true);
        setProgress(1);  // reset progress when starting
        setMinutes(DEFAULT_TIME);  // reset time when starting
    };

    const onPause = () => {
        setIsStarted(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
            </View>
            <View style={{ paddingTop: spacing.xl }}>
                <Text style={styles.title}>Focusing On :</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View> 
            <View style={{ paddingTop: spacing.md }}>
                <ProgressBar progress={progress} color='#5E84E2' style={{ height: 10 }} />
            </View>
            <View style={styles.buttonwrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonwrapper}>
                {isStarted ? 
                    (<RoundedButton title="Pause" onPress={onPause} />) :
                    (<RoundedButton title="Start" onPress={onStart} />)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonwrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
