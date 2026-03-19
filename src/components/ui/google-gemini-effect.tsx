import { motion, type MotionValue } from "framer-motion";

interface GoogleGeminiEffectProps {
  pathLengths: MotionValue<number>[];
  title?: string;
  description?: string;
}

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
}: GoogleGeminiEffectProps) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: "10%",
          textAlign: "center",
          padding: "0 24px",
          width: "100%",
        }}
      >
        {title && (
          <p
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.045em",
              lineHeight: 1.08,
              margin: "0 0 16px",
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {title}
          </p>
        )}
        {description && (
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* SVG container — positioned at bottom half */}
      <svg
        width="1440"
        height="890"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          minWidth: 1000,
        }}
      >
        <defs>
          {/* Gradient 1 — Green */}
          <linearGradient id="gemGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
            <stop offset="40%" stopColor="#18CCFC" />
            <stop offset="50%" stopColor="#6344F5" />
            <stop offset="60%" stopColor="#AE48FF" />
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
          </linearGradient>
          {/* Gradient 2 — Blue */}
          <linearGradient id="gemGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6344F5" stopOpacity="0" />
            <stop offset="40%" stopColor="#6344F5" />
            <stop offset="50%" stopColor="#AE48FF" />
            <stop offset="60%" stopColor="#18CCFC" />
            <stop offset="100%" stopColor="#18CCFC" stopOpacity="0" />
          </linearGradient>
          {/* Gradient 3 — Purple */}
          <linearGradient id="gemGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AE48FF" stopOpacity="0" />
            <stop offset="40%" stopColor="#AE48FF" />
            <stop offset="50%" stopColor="#18CCFC" />
            <stop offset="60%" stopColor="#6344F5" />
            <stop offset="100%" stopColor="#6344F5" stopOpacity="0" />
          </linearGradient>
          {/* Gradient 4 — Pink-cyan */}
          <linearGradient id="gemGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
            <stop offset="30%" stopColor="#18CCFC" />
            <stop offset="50%" stopColor="#6344F5" />
            <stop offset="70%" stopColor="#AE48FF" />
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
          </linearGradient>
          {/* Gradient 5 — White-ghost */}
          <linearGradient id="gemGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6344F5" stopOpacity="0" />
            <stop offset="35%" stopColor="#6344F5" />
            <stop offset="52%" stopColor="#AE48FF" />
            <stop offset="70%" stopColor="#18CCFC" />
            <stop offset="100%" stopColor="#18CCFC" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Path 1 */}
        <motion.path
          d="M0 663C145.5 663 191 666.265 269 647C326.5 633 339.5 580 351 571C369.5 556.5 414.5 560 443 565.5C497 576 531.5 596 572 609.5C611.5 622.5 662.5 640 695.5 640C713.5 640 723.5 637.5 740 627.5C760 615 772 596.5 790 588.5C810 579.5 832 582 849.5 586C868.5 590.5 888 603 920 603C942.5 603 965.5 588 976 580C993 567 1007.5 553 1024 543C1047 529.5 1080.5 520.5 1107 527C1126 531.5 1138 546 1149 558C1162.5 573 1176 594 1199.5 601C1231 610.5 1261 592.5 1284 580C1313.5 564 1357 545 1440 558"
          fill="none"
          stroke="url(#gemGrad0)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[0],
            opacity: 0.6,
            filter: "drop-shadow(0 0 6px rgba(24,204,252,0.4))",
          }}
        />

        {/* Path 2 */}
        <motion.path
          d="M0 587C147 587 277 559.5 310 553C348 545.5 380 539 410 535C447 530 477 529 504 529.5C538 530 568 541 597 548C629 556 658 565 684 571.5C707 577.5 731.5 585 756 580C783 574.5 801.5 553 823 545.5C849.5 536.5 878 541 902 549.5C924 557 944 570.5 962 578.5C980 586.5 1001 598 1022 595C1043.5 591.5 1055.5 573.5 1072 561C1092 546 1117 534 1140 530.5C1167 526.5 1189 534 1209 545C1231 557 1253 576 1278 584C1303 592 1340 595 1440 589"
          fill="none"
          stroke="url(#gemGrad1)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[1],
            opacity: 0.6,
            filter: "drop-shadow(0 0 6px rgba(99,68,245,0.4))",
          }}
        />

        {/* Path 3 */}
        <motion.path
          d="M0 514C147 514 254 502 310 500.5C373 498.5 413.5 505 446 509.5C487 515 520 524 551 530C586 537 618 544 649 545.5C676 547 704 544 730 538C753 533 775 523 798 516.5C823 509 849 506 875 509C896 511.5 917 520 936 527.5C952 534 967 541.5 987 546C1011 551.5 1034 549 1056 542.5C1079 536 1098 525.5 1120 519C1144 512 1169 510 1193 514C1215 518 1235 527 1255.5 535.5C1278 545 1298 556 1340 555 1440 550"
          fill="none"
          stroke="url(#gemGrad2)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[2],
            opacity: 0.6,
            filter: "drop-shadow(0 0 6px rgba(174,72,255,0.4))",
          }}
        />

        {/* Path 4 */}
        <motion.path
          d="M0 450C145 450 232 437 275 432.5C327 427 363 430 400 435C443 441 479 453 514 460.5C549 468 584 474 619 474C650 474 681 467 710 458C738 449 764 436 793 431C822 426 850 427 878 434C902 440 925 452 946 461C969 471 990 480 1014 483C1044 487 1074 481 1101 472C1128 463 1152 449 1178 441C1207 432 1237 431 1264 437C1290 443 1312 456 1338 464C1365 472.5 1399 475 1440 470"
          fill="none"
          stroke="url(#gemGrad3)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[3],
            opacity: 0.6,
            filter: "drop-shadow(0 0 6px rgba(24,204,252,0.3))",
          }}
        />

        {/* Path 5 */}
        <motion.path
          d="M0 395C140 395 224 384 267 379C322 372 360 372 398 377C436 382 470 396 504 405C542 415 580 422 618 422C654 422 689 416 720 405C750 394 778 379 810 372C842 365 874 365 905 373C932 380 957 394 980 404.5C1005 416 1028 426 1054 428C1085 431 1116 424 1145 413C1172 403 1197 389 1225 381C1256 372 1288 370 1318 378C1347 386 1371 401 1440 408"
          fill="none"
          stroke="url(#gemGrad4)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[4],
            opacity: 0.6,
            filter: "drop-shadow(0 0 6px rgba(99,68,245,0.3))",
          }}
        />
      </svg>

      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background:
            "radial-gradient(ellipse 50% 40% at 50% 80%, transparent 0%, #000 85%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
