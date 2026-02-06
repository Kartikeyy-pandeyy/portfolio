import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import "../styles/v2-landing.css";
import QuietBlock from "../components/QuietBlock";
import TypewriterText from "../components/TypewriterText";
import content from "../assets/v2Content.json";
import yamlConfigUrl from "../config/v2-config.yaml";
import { deepMerge, parseSimpleYaml } from "../config/parseSimpleYaml";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TIMING_PRESETS = {
  cinematic: {
    intro: {
      loaderMs: 900,
      afterLoaderMs: 650,
      introTypeMs: 150,
      beforeMoveTopMs: 700,
      afterMoveTopMs: 1150,
      trimMs: 115,
      beforeSurnameMs: 320,
      surnameTypeMs: 145,
      beforeContentMs: 540,
    },
    content: {
      opening: 25,
      values: 24,
      label: 27,
      list: 23,
      philosophy: 20,
      ambition: 23,
      closing: 23,
      footer: 26,
      sectionPauseMs: 240,
    },
  },
  balanced: {
    intro: {
      loaderMs: 700,
      afterLoaderMs: 450,
      introTypeMs: 130,
      beforeMoveTopMs: 600,
      afterMoveTopMs: 900,
      trimMs: 95,
      beforeSurnameMs: 240,
      surnameTypeMs: 125,
      beforeContentMs: 380,
    },
    content: {
      opening: 20,
      values: 19,
      label: 22,
      list: 18,
      philosophy: 15,
      ambition: 18,
      closing: 18,
      footer: 22,
      sectionPauseMs: 170,
    },
  },
  fast: {
    intro: {
      loaderMs: 400,
      afterLoaderMs: 260,
      introTypeMs: 90,
      beforeMoveTopMs: 360,
      afterMoveTopMs: 520,
      trimMs: 65,
      beforeSurnameMs: 140,
      surnameTypeMs: 85,
      beforeContentMs: 220,
    },
    content: {
      opening: 13,
      values: 13,
      label: 15,
      list: 12,
      philosophy: 11,
      ambition: 12,
      closing: 12,
      footer: 14,
      sectionPauseMs: 90,
    },
  },
};

const DEFAULT_V2_CONFIG = {
  timing: {
    profile: "balanced",
    contentSpeedMultiplier: 0.75,
    sectionPauseMultiplier: 0.85,
  },
  title: {
    moveDurationMs: 1250,
    moveEase: "cubic-bezier(0.16, 1, 0.3, 1)",
    topFontSize: "clamp(1.78rem, 4.5vw, 2.85rem)",
    topFontSizeScrolled: "clamp(1.52rem, 3.6vw, 2.25rem)",
    topOffset: "clamp(0.72rem, 2.4vw, 1.3rem)",
    topOffsetScrolled: "clamp(0.56rem, 1.8vw, 1rem)",
    mobileTopFontSize: "clamp(1.65rem, 6.6vw, 2.35rem)",
    mobileTopFontSizeScrolled: "clamp(1.44rem, 5.7vw, 2.05rem)",
    mobileTopOffset: "0.64rem",
    mobileTopOffsetScrolled: "0.52rem",
  },
  strip: {
    height: "clamp(4.2rem, 8.2vw, 5.5rem)",
    heightScrolled: "clamp(3.35rem, 6.1vw, 4.35rem)",
    heightMobile: "clamp(3.35rem, 10.8vw, 4.2rem)",
    heightMobileScrolled: "clamp(2.95rem, 9.8vw, 3.7rem)",
    contractDurationMs: 900,
    contractEase: "cubic-bezier(0.16, 1, 0.3, 1)",
    background:
      "linear-gradient(180deg, rgba(247, 245, 239, 0.73) 0%, rgba(247, 245, 239, 0.45) 100%)",
    backgroundScrolled:
      "linear-gradient(180deg, rgba(247, 245, 239, 0.84) 0%, rgba(247, 245, 239, 0.62) 100%)",
    blurPx: 14,
    saturatePercent: 132,
    borderColor: "rgba(31, 31, 28, 0.09)",
    shadowScrolled: "0 12px 28px rgba(31, 31, 28, 0.12)",
  },
  layout: {
    contentStartOffset: "clamp(4.9rem, 8.3vw, 6.5rem)",
    contentStartOffsetMobile: "clamp(2.15rem, 6.2vw, 2.9rem)",
  },
  theme: {
    backgroundBase: "#f8f6f1",
    backgroundAccentA: "rgba(219, 208, 183, 0.22)",
    backgroundAccentB: "rgba(198, 216, 232, 0.17)",
    text: "#1c1c19",
    muted: "rgba(28, 28, 25, 0.64)",
    link: "#2e445d",
    linkSoft: "rgba(46, 68, 93, 0.34)",
    grainOpacity: 0.11,
  },
};

const withMultiplier = (value, multiplier) =>
  Math.max(6, Math.round(Number(value) * Number(multiplier)));

const V2Landing = () => {
  const fullName = content.identity.name || "Kartikey Pandey";
  const introPrefix = content.identity.introPrefix || "Hi, ";
  const introSuffix = content.identity.introSuffix || "";
  const firstName = useMemo(() => fullName.split(" ")[0], [fullName]);
  const surnamePart = useMemo(
    () => fullName.slice(firstName.length),
    [firstName, fullName]
  );
  const introText = useMemo(
    () => `${introPrefix}${firstName}${introSuffix}`,
    [firstName, introPrefix, introSuffix]
  );
  const [runtimeConfig, setRuntimeConfig] = useState(DEFAULT_V2_CONFIG);
  const timingProfileName =
    runtimeConfig.timing?.profile || content.motion?.timingProfile || "balanced";
  const timingPreset = TIMING_PRESETS[timingProfileName] || TIMING_PRESETS.balanced;
  const contentSpeedMultiplier = runtimeConfig.timing?.contentSpeedMultiplier ?? 1;
  const sectionPauseMultiplier = runtimeConfig.timing?.sectionPauseMultiplier ?? 1;
  const timing = useMemo(
    () => ({
      intro: timingPreset.intro,
      content: {
        opening: withMultiplier(timingPreset.content.opening, contentSpeedMultiplier),
        values: withMultiplier(timingPreset.content.values, contentSpeedMultiplier),
        label: withMultiplier(timingPreset.content.label, contentSpeedMultiplier),
        list: withMultiplier(timingPreset.content.list, contentSpeedMultiplier),
        philosophy: withMultiplier(
          timingPreset.content.philosophy,
          contentSpeedMultiplier
        ),
        ambition: withMultiplier(timingPreset.content.ambition, contentSpeedMultiplier),
        closing: withMultiplier(timingPreset.content.closing, contentSpeedMultiplier),
        footer: withMultiplier(timingPreset.content.footer, contentSpeedMultiplier),
        sectionPauseMs: withMultiplier(
          timingPreset.content.sectionPauseMs,
          sectionPauseMultiplier
        ),
      },
    }),
    [contentSpeedMultiplier, sectionPauseMultiplier, timingPreset]
  );

  const learningPoints = content.learning.points || [];
  const explorationPoints = content.exploration.points || [];

  const steps = useMemo(() => {
    const opening = 0;
    const values = 1;
    const learningIntro = 2;
    const learningStart = 3;
    const explorationIntro = learningStart + learningPoints.length;
    const explorationStart = explorationIntro + 1;
    const philosophy = explorationStart + explorationPoints.length;
    const ambition = philosophy + 1;
    const closing = ambition + 1;
    const footer = closing + 1;
    const done = footer + 1;

    return {
      opening,
      values,
      learningIntro,
      learningStart,
      explorationIntro,
      explorationStart,
      philosophy,
      ambition,
      closing,
      footer,
      done,
    };
  }, [explorationPoints.length, learningPoints.length]);

  const [isLoading, setIsLoading] = useState(true);
  const [titleAtTop, setTitleAtTop] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [contentStep, setContentStep] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStripVisible, setIsStripVisible] = useState(false);
  const [isConfigReady, setIsConfigReady] = useState(false);
  const stepTimeoutsRef = useRef([]);
  const introHasStartedRef = useRef(false);

  const advanceStep = useCallback((expectedStep) => {
    const timeoutId = setTimeout(() => {
      setContentStep((prev) => (prev === expectedStep ? prev + 1 : prev));
    }, timing.content.sectionPauseMs);

    stepTimeoutsRef.current.push(timeoutId);
  }, [timing.content.sectionPauseMs]);

  useEffect(() => {
    let isMounted = true;

    const loadYamlConfig = async () => {
      try {
        const response = await fetch(yamlConfigUrl);
        if (!response.ok) return;

        const yamlText = await response.text();
        const parsed = parseSimpleYaml(yamlText);
        if (!isMounted) return;

        setRuntimeConfig(deepMerge(DEFAULT_V2_CONFIG, parsed));
      } catch {
        // Keep defaults if yaml load fails
      } finally {
        if (isMounted) {
          setIsConfigReady(true);
        }
      }
    };

    loadYamlConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      stepTimeoutsRef.current.forEach((id) => clearTimeout(id));
      stepTimeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add("v2-active");
    return () => {
      document.body.classList.remove("v2-active");
    };
  }, []);

  useEffect(() => {
    if (!isConfigReady) return;
    if (introHasStartedRef.current) return;
    introHasStartedRef.current = true;

    let cancelled = false;
    let stripShowTimeoutId;

    const playIntro = async () => {
      await wait(timing.intro.loaderMs);
      if (cancelled) return;

      setIsLoading(false);

      await wait(timing.intro.afterLoaderMs);
      for (let i = 1; i <= introText.length; i += 1) {
        if (cancelled) return;
        setTitleText(introText.slice(0, i));
        await wait(timing.intro.introTypeMs);
      }

      await wait(timing.intro.beforeMoveTopMs);
      if (cancelled) return;
      setTitleAtTop(true);
      setContentStep((prev) => (prev < steps.opening ? steps.opening : prev));
      stripShowTimeoutId = setTimeout(() => {
        if (!cancelled) {
          setIsStripVisible(true);
        }
      }, runtimeConfig.title.moveDurationMs);

      await wait(timing.intro.afterMoveTopMs);
      let current = introText;
      const textWithoutPrefix = `${firstName}${introSuffix}`;

      while (current !== textWithoutPrefix) {
        if (cancelled) return;
        current = current.slice(1);
        setTitleText(current);
        await wait(timing.intro.trimMs);
      }

      while (current !== firstName) {
        if (cancelled) return;
        current = current.slice(0, -1);
        setTitleText(current);
        await wait(timing.intro.trimMs);
      }

      await wait(timing.intro.beforeSurnameMs);
      for (let i = 1; i <= surnamePart.length; i += 1) {
        if (cancelled) return;
        setTitleText(`${firstName}${surnamePart.slice(0, i)}`);
        await wait(timing.intro.surnameTypeMs);
      }

      await wait(timing.intro.beforeContentMs);
      if (cancelled) return;
    };

    playIntro();

    return () => {
      cancelled = true;
      clearTimeout(stripShowTimeoutId);
    };
  }, [
    firstName,
    introSuffix,
    introText,
    isConfigReady,
    runtimeConfig.title.moveDurationMs,
    steps.opening,
    surnamePart,
    timing,
  ]);

  return (
    <main
      className={`v2-page ${isLoading ? "is-loading" : "is-ready"}`}
      style={{
        "--v2-title-move-duration": `${runtimeConfig.title.moveDurationMs}ms`,
        "--v2-title-move-ease": runtimeConfig.title.moveEase,
        "--v2-title-top-font-size": runtimeConfig.title.topFontSize,
        "--v2-title-top-font-size-scrolled":
          runtimeConfig.title.topFontSizeScrolled,
        "--v2-title-top-offset": runtimeConfig.title.topOffset,
        "--v2-title-top-offset-scrolled": runtimeConfig.title.topOffsetScrolled,
        "--v2-title-mobile-top-font-size": runtimeConfig.title.mobileTopFontSize,
        "--v2-title-mobile-top-font-size-scrolled":
          runtimeConfig.title.mobileTopFontSizeScrolled,
        "--v2-title-mobile-top-offset": runtimeConfig.title.mobileTopOffset,
        "--v2-title-mobile-top-offset-scrolled":
          runtimeConfig.title.mobileTopOffsetScrolled,
        "--v2-strip-height": runtimeConfig.strip.height,
        "--v2-strip-height-scrolled": runtimeConfig.strip.heightScrolled,
        "--v2-strip-height-mobile": runtimeConfig.strip.heightMobile,
        "--v2-strip-height-mobile-scrolled":
          runtimeConfig.strip.heightMobileScrolled,
        "--v2-strip-contract-duration": `${runtimeConfig.strip.contractDurationMs}ms`,
        "--v2-strip-contract-ease": runtimeConfig.strip.contractEase,
        "--v2-strip-bg": runtimeConfig.strip.background,
        "--v2-strip-bg-scrolled": runtimeConfig.strip.backgroundScrolled,
        "--v2-strip-blur": `${runtimeConfig.strip.blurPx}px`,
        "--v2-strip-saturate": `${runtimeConfig.strip.saturatePercent}%`,
        "--v2-strip-border": runtimeConfig.strip.borderColor,
        "--v2-strip-shadow-scrolled": runtimeConfig.strip.shadowScrolled,
        "--v2-content-offset": runtimeConfig.layout.contentStartOffset,
        "--v2-content-offset-mobile": runtimeConfig.layout.contentStartOffsetMobile,
        "--v2-bg-base": runtimeConfig.theme.backgroundBase,
        "--v2-bg-accent-a": runtimeConfig.theme.backgroundAccentA,
        "--v2-bg-accent-b": runtimeConfig.theme.backgroundAccentB,
        "--v2-text": runtimeConfig.theme.text,
        "--v2-muted": runtimeConfig.theme.muted,
        "--v2-link": runtimeConfig.theme.link,
        "--v2-link-soft": runtimeConfig.theme.linkSoft,
        "--v2-grain-opacity": runtimeConfig.theme.grainOpacity,
      }}
    >
      <div className={`v2-loader ${isLoading ? "" : "is-hidden"}`} />
      <div
        className={`v2-title-strip ${isStripVisible ? "is-visible" : ""} ${
          isScrolled ? "is-scrolled" : ""
        }`}
      />
      <h1
        className={`v2-floating-title ${titleAtTop ? "at-top" : ""} ${
          isScrolled ? "is-scrolled" : ""
        }`}
      >
        {titleText}
      </h1>

      <div className="v2-shell">
        <div className="v2-container">
          <div className={`v2-content ${contentStep >= 0 ? "is-visible" : ""}`}>
            {contentStep >= steps.opening && (
              <QuietBlock className="v2-opening">
                <TypewriterText
                  text={content.identity.opening}
                  start={contentStep >= steps.opening}
                  speedMs={timing.content.opening}
                  onComplete={() => advanceStep(steps.opening)}
                />
              </QuietBlock>
            )}

            {contentStep >= steps.values && (
              <QuietBlock>
                <TypewriterText
                  text={content.values.text}
                  start={contentStep >= steps.values}
                  speedMs={timing.content.values}
                  onComplete={() => advanceStep(steps.values)}
                />
              </QuietBlock>
            )}

            {contentStep >= steps.learningIntro && (
              <QuietBlock>
                <TypewriterText
                  text={content.learning.intro}
                  start={contentStep >= steps.learningIntro}
                  speedMs={timing.content.label}
                  className="v2-soft-label"
                  onComplete={() => advanceStep(steps.learningIntro)}
                />
                <ul>
                  {learningPoints.map((point, index) => {
                    const step = steps.learningStart + index;

                    if (contentStep < step) return null;

                    return (
                      <TypewriterText
                        key={point}
                        text={point}
                        start={contentStep >= step}
                        speedMs={timing.content.list}
                        as="li"
                        onComplete={() => advanceStep(step)}
                      />
                    );
                  })}
                </ul>
              </QuietBlock>
            )}

            {contentStep >= steps.explorationIntro && (
              <QuietBlock>
                <TypewriterText
                  text={content.exploration.intro}
                  start={contentStep >= steps.explorationIntro}
                  speedMs={timing.content.label}
                  className="v2-soft-label"
                  onComplete={() => advanceStep(steps.explorationIntro)}
                />
                <ul>
                  {explorationPoints.map((point, index) => {
                    const step = steps.explorationStart + index;

                    if (contentStep < step) return null;

                    return (
                      <TypewriterText
                        key={point}
                        text={point}
                        start={contentStep >= step}
                        speedMs={timing.content.list}
                        as="li"
                        onComplete={() => advanceStep(step)}
                      />
                    );
                  })}
                </ul>
              </QuietBlock>
            )}

            {contentStep >= steps.philosophy && (
              <QuietBlock>
                <TypewriterText
                  text={content.philosophy.text}
                  start={contentStep >= steps.philosophy}
                  speedMs={timing.content.philosophy}
                  onComplete={() => advanceStep(steps.philosophy)}
                />
              </QuietBlock>
            )}

            {contentStep >= steps.ambition && (
              <QuietBlock>
                <TypewriterText
                  text={content.ambition.text}
                  start={contentStep >= steps.ambition}
                  speedMs={timing.content.ambition}
                  onComplete={() => advanceStep(steps.ambition)}
                />
              </QuietBlock>
            )}

            {contentStep >= steps.closing && (
              <QuietBlock>
                <TypewriterText
                  text={content.closing.text}
                  start={contentStep >= steps.closing}
                  speedMs={timing.content.closing}
                  onComplete={() => advanceStep(steps.closing)}
                />
                <div className={`v2-links ${contentStep > steps.closing ? "is-visible" : ""}`}>
                  {content.links.items.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </QuietBlock>
            )}

            {contentStep >= steps.footer && (
              <QuietBlock>
                <TypewriterText
                  text={content.footerNote}
                  start={contentStep >= steps.footer}
                  speedMs={timing.content.footer}
                  className="v2-footnote"
                  onComplete={() => advanceStep(steps.footer)}
                />
              </QuietBlock>
            )}
          </div>

          <div className={`v2-views ${contentStep >= steps.done ? "is-visible" : ""}`} aria-label="View count">
            <FaEye className="v2-views-icon" />
            <span>{content.views.count}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default V2Landing;
