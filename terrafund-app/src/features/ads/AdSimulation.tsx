                    });
                }
            }
        }, interval);
    };

return (
    <>
        <div className={styles.container}>
            <div className={styles.adBox}>
                {isWatching ? (
                    <div className={styles.watching}>
                        <p className={styles.text}>Watching Ad...</p>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={styles.idle}>
                        <p className={styles.text}>Watch an ad to support the tree fund</p>
                        <div className={styles.rewardBadge}>+$0.002 to fund</div>
                    </div>
                )}
            </div>

            <Button
                onClick={handleWatchAd}
                disabled={isWatching}
                className={styles.button}
                variant="secondary"
            >
                {isWatching ? 'Watching...' : 'Watch Ad'}
            </Button>

            {showParticles && <ParticleEffect trigger={showParticles} />}
        </div>

        {/* Tree planted celebration */}
        <Achievement
            show={achievement.show}
            title={achievement.title}
            description={achievement.description}
            icon={achievement.icon}
            onClose={() => setAchievement(prev => ({ ...prev, show: false }))}
        />
    </>
);
};
