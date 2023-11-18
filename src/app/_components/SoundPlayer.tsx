"use client";

const url =
    "https://hitsounds-tf.s3.amazonaws.com/875983274hgfejhgfkjh398457398gjsdhg.wav";

export default function SoundPlayer() {
    return (
        <div>
            <audio
                controls
                className="h-10 rounded-lg text-white"
                preload="none"
            >
                <source src={url} type="audio/wav" />
                {/* <source src={url} type="audio/x-pn-wav" /> */}
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
