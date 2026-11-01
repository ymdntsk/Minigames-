//=============================================================================
// Minigames.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Rhythm, Memory and Math mini games. Each one stores its result in a variable you choose.
 * @author ymdntsk
 *
 * @help
 * ============================================================================
 * Minigames
 * ============================================================================
 * Adds three mini games you can start from any event with a Plugin Command:
 *
 *   - Start Rhythm Mini Game : tap in time with the beat (3 notes by default).
 *   - Start Memory Mini Game : flip cards and find all the pairs.
 *   - Start Math Mini Game   : solve math questions (multiple choice).
 *
 * HOW TO USE
 * 1. Save this file as Minigames.js in js/plugins/ (keep the exact name).
 * 2. Enable it in the Plugin Manager.
 * 3. In an event, add Plugin Command > Minigames > (pick a mini game).
 *
 * RESULT VARIABLE
 * Every command has a "Result Variable" setting. When the mini game ends,
 * that variable is set to:
 *   - "Win Value"  (default 1) if the player wins,
 *   - "Lose Value" (default 0) if the player loses or quits with Esc.
 * The event continues after the mini game, so right after the command you
 * can add a Conditional Branch: Variable [your variable] = 1.
 *
 * SCORE VARIABLE (optional)
 * Also stores a number for the result:
 *   - Rhythm : number of notes hit.
 *   - Memory : number of mistakes made.
 *   - Math   : number of correct answers.
 *
 * CONTROLS
 *   - Rhythm : Enter / Z / Space or click / tap.
 *   - Memory : mouse click, or arrow keys + Enter.
 *   - Math   : mouse click, or arrow keys + Enter.
 *   - Esc / right click quits the mini game (counts as a loss).
 *
 * TEXTS
 * All in-game texts are in English. They are grouped in the TEXT constants
 * and in the intro / result messages inside this file if you want to edit.
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ----------------------------------------------------------------------------
 * @param allowQuit
 * @text Allow Quitting With Esc
 * @desc If ON, the player can quit with Esc (counts as a loss).
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param accentColor
 * @text Accent Color
 * @desc Color of titles and borders (hex, e.g. #ffd36b).
 * @type string
 * @default #ffd36b
 *
 * @param perfectWindow
 * @text Rhythm: Perfect Window (ms)
 * @desc How close to the beat a tap must be to count as Perfect.
 * @type number
 * @min 10
 * @default 90
 *
 * @param goodWindow
 * @text Rhythm: Good Window (ms)
 * @desc How close to the beat a tap must be to count as Good. Later than this is a Miss.
 * @type number
 * @min 20
 * @default 180
 *
 * @param memoryIcons
 * @text Memory: Card Icons
 * @desc Icon indexes (from IconSet) used on the cards. Each game picks random ones from this list.
 * @type number[]
 * @min 1
 * @default ["64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81"]
 *
 * @command startRhythm
 * @text Start Rhythm Mini Game
 * @desc Tap in time with the beat. Notes move to the ring; press when they reach it.
 *
 * @arg resultVariable
 * @text Result Variable
 * @desc Variable that receives the Win / Lose value when the game ends.
 * @type variable
 * @default 1
 *
 * @arg winValue
 * @text Win Value
 * @type number
 * @min -99999999
 * @default 1
 *
 * @arg loseValue
 * @text Lose Value
 * @type number
 * @min -99999999
 * @default 0
 *
 * @arg scoreVariable
 * @text Score Variable (optional)
 * @desc Receives the number of notes hit. 0 = none.
 * @type variable
 * @default 0
 *
 * @arg bpm
 * @text Tempo (BPM)
 * @desc Beats per minute. Lower is easier.
 * @type number
 * @min 40
 * @max 240
 * @default 90
 *
 * @arg notes
 * @text Number of Notes
 * @type number
 * @min 1
 * @max 12
 * @default 3
 *
 * @arg neededHits
 * @text Hits Needed to Win
 * @desc 0 = all notes.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg metronome
 * @text Play Metronome Ticks
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @command startMemory
 * @text Start Memory Mini Game
 * @desc Flip cards and find all the matching pairs.
 *
 * @arg resultVariable
 * @text Result Variable
 * @desc Variable that receives the Win / Lose value when the game ends.
 * @type variable
 * @default 1
 *
 * @arg winValue
 * @text Win Value
 * @type number
 * @min -99999999
 * @default 1
 *
 * @arg loseValue
 * @text Lose Value
 * @type number
 * @min -99999999
 * @default 0
 *
 * @arg scoreVariable
 * @text Score Variable (optional)
 * @desc Receives the number of mistakes made. 0 = none.
 * @type variable
 * @default 0
 *
 * @arg pairs
 * @text Number of Pairs
 * @type number
 * @min 2
 * @max 18
 * @default 6
 *
 * @arg maxMistakes
 * @text Max Mistakes
 * @desc The game is lost when the player reaches this many mistakes. 0 = unlimited.
 * @type number
 * @min 0
 * @default 6
 *
 * @arg timeLimit
 * @text Time Limit (seconds)
 * @desc 0 = no time limit.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg previewSeconds
 * @text Preview Time (seconds)
 * @desc How long all cards are shown at the start. 0 = no preview.
 * @type number
 * @min 0
 * @default 3
 *
 * @command startMath
 * @text Start Math Mini Game
 * @desc Answer math questions by picking the right option.
 *
 * @arg resultVariable
 * @text Result Variable
 * @desc Variable that receives the Win / Lose value when the game ends.
 * @type variable
 * @default 1
 *
 * @arg winValue
 * @text Win Value
 * @type number
 * @min -99999999
 * @default 1
 *
 * @arg loseValue
 * @text Lose Value
 * @type number
 * @min -99999999
 * @default 0
 *
 * @arg scoreVariable
 * @text Score Variable (optional)
 * @desc Receives the number of correct answers. 0 = none.
 * @type variable
 * @default 0
 *
 * @arg questions
 * @text Number of Questions
 * @type number
 * @min 1
 * @max 30
 * @default 5
 *
 * @arg neededCorrect
 * @text Correct Answers Needed
 * @desc 0 = all questions.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg difficulty
 * @text Difficulty
 * @type select
 * @option Easy
 * @value easy
 * @option Normal
 * @value normal
 * @option Hard
 * @value hard
 * @default normal
 *
 * @arg operations
 * @text Operations
 * @desc Characters: + (add)  - (subtract)  * (multiply)  / (divide). Example: +-*
 * @type string
 * @default +-*
 *
 * @arg timePerQuestion
 * @text Time per Question (seconds)
 * @desc 0 = no time limit.
 * @type number
 * @min 0
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = "Minigames";
    const params = PluginManager.parameters(pluginName);

    const num = (v, d) => {
        const n = Number(v);
        return (v === undefined || v === "" || Number.isNaN(n)) ? d : n;
    };
    const bool = (v, d) => (v === undefined || v === "" ? d : String(v) === "true");

    //-------------------------------------------------------------------------
    // Plugin parameters
    //-------------------------------------------------------------------------

    const allowQuit = bool(params.allowQuit, true);
    const accentColor = String(params.accentColor || "#ffd36b");
    const perfectWindow = num(params.perfectWindow, 90);
    const goodWindow = Math.max(perfectWindow, num(params.goodWindow, 180));

    function parseIcons(text) {
        let list = [];
        try {
            list = JSON.parse(text || "[]").map(Number).filter(n => n > 0);
        } catch (e) {
            list = [];
        }
        return list.length > 0 ? list : [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
    }

    const memoryIcons = parseIcons(params.memoryIcons);

    //-------------------------------------------------------------------------
    // Texts (English)
    //-------------------------------------------------------------------------

    const TEXT = {
        startHint: allowQuit
            ? "Press Enter / click to start   |   Esc: quit"
            : "Press Enter / click to start",
        continueHint: "Press Enter / click to continue",
        success: "SUCCESS!",
        failure: "FAILED"
    };

    const COLOR_GOOD = "#7dffb0";
    const COLOR_BAD = "#ff6b6b";

    //-------------------------------------------------------------------------
    // Helpers
    //-------------------------------------------------------------------------

    const FRAME_MS = 1000 / 60;

    function randInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
        return array;
    }

    function newBitmap(width, height, fontSize, color) {
        const bitmap = new Bitmap(Math.max(1, Math.ceil(width)), Math.max(1, Math.ceil(height)));
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = fontSize || 28;
        bitmap.textColor = color || "#ffffff";
        return bitmap;
    }

    function drawPanel(bitmap, x, y, w, h, radius, fill, stroke, lineWidth) {
        const ctx = bitmap.context;
        const r = Math.min(radius, w / 2, h / 2);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
        }
        if (stroke) {
            ctx.lineWidth = lineWidth || 2;
            ctx.strokeStyle = stroke;
            ctx.stroke();
        }
        ctx.restore();
        bitmap._baseTexture.update();
    }

    //-------------------------------------------------------------------------
    // Minigame manager + plugin commands
    //-------------------------------------------------------------------------

    const MinigameManager = {
        _config: null,
        start(sceneClass, config) {
            this._config = config;
            SceneManager.push(sceneClass);
        },
        config() {
            return this._config;
        }
    };

    function baseConfig(args) {
        return {
            resultVariable: num(args.resultVariable, 0),
            winValue: num(args.winValue, 1),
            loseValue: num(args.loseValue, 0),
            scoreVariable: num(args.scoreVariable, 0)
        };
    }

    PluginManager.registerCommand(pluginName, "startRhythm", args => {
        if ($gameParty.inBattle()) {
            return;
        }
        const config = baseConfig(args);
        config.bpm = num(args.bpm, 90);
        config.notes = num(args.notes, 3);
        config.neededHits = num(args.neededHits, 0);
        config.metronome = bool(args.metronome, true);
        MinigameManager.start(Scene_MGRhythm, config);
    });

    PluginManager.registerCommand(pluginName, "startMemory", args => {
        if ($gameParty.inBattle()) {
            return;
        }
        const config = baseConfig(args);
        config.pairs = num(args.pairs, 6);
        config.maxMistakes = num(args.maxMistakes, 6);
        config.timeLimit = num(args.timeLimit, 0);
        config.previewSeconds = num(args.previewSeconds, 3);
        MinigameManager.start(Scene_MGMemory, config);
    });

    PluginManager.registerCommand(pluginName, "startMath", args => {
        if ($gameParty.inBattle()) {
            return;
        }
        const config = baseConfig(args);
        config.questions = num(args.questions, 5);
        config.neededCorrect = num(args.neededCorrect, 0);
        config.difficulty = String(args.difficulty || "normal");
        config.operations = String(args.operations === undefined ? "+-*" : args.operations);
        config.timePerQuestion = num(args.timePerQuestion, 0);
        MinigameManager.start(Scene_MGMath, config);
    });

    //-------------------------------------------------------------------------
    // Sprite_MGLabel : a text label
    //-------------------------------------------------------------------------

    function Sprite_MGLabel() {
        this.initialize(...arguments);
    }

    Sprite_MGLabel.prototype = Object.create(Sprite.prototype);
    Sprite_MGLabel.prototype.constructor = Sprite_MGLabel;

    Sprite_MGLabel.prototype.initialize = function(width, height, fontSize, align, color) {
        Sprite.prototype.initialize.call(this);
        this._labelWidth = width;
        this._labelHeight = height;
        this._labelFontSize = fontSize;
        this._labelAlign = align || "left";
        this._labelColor = color || "#ffffff";
        this._labelText = null;
        this._labelCurrentColor = null;
        this.bitmap = newBitmap(width, height, fontSize, this._labelColor);
        this.setText("");
    };

    Sprite_MGLabel.prototype.setText = function(text, color) {
        const c = color || this._labelColor;
        const t = String(text);
        if (t === this._labelText && c === this._labelCurrentColor) {
            return;
        }
        this._labelText = t;
        this._labelCurrentColor = c;
        const bitmap = this.bitmap;
        bitmap.clear();
        bitmap.textColor = c;
        const lineHeight = Math.ceil(this._labelFontSize * 1.4);
        t.split("\n").forEach((line, i) => {
            bitmap.drawText(line, 0, i * lineHeight, this._labelWidth, lineHeight, this._labelAlign);
        });
    };

    //-------------------------------------------------------------------------
    // Sprite_MGButton : a clickable button with a label
    //-------------------------------------------------------------------------

    function Sprite_MGButton() {
        this.initialize(...arguments);
    }

    Sprite_MGButton.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_MGButton.prototype.constructor = Sprite_MGButton;

    Sprite_MGButton.prototype.initialize = function(width, height, fontSize) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._buttonWidth = width;
        this._buttonHeight = height;
        this._buttonText = "";
        this._buttonState = "normal";
        this._buttonHighlight = false;
        this._hoverHandler = null;
        this._clickHandler = null;
        this.bitmap = newBitmap(width, height, fontSize);
        this.redraw();
    };

    Sprite_MGButton.prototype.setText = function(text) {
        if (text !== this._buttonText) {
            this._buttonText = text;
            this.redraw();
        }
    };

    Sprite_MGButton.prototype.setState = function(state) {
        if (state !== this._buttonState) {
            this._buttonState = state;
            this.redraw();
        }
    };

    Sprite_MGButton.prototype.setHighlight = function(value) {
        if (value !== this._buttonHighlight) {
            this._buttonHighlight = value;
            this.redraw();
        }
    };

    Sprite_MGButton.prototype.redraw = function() {
        const bitmap = this.bitmap;
        const w = this._buttonWidth;
        const h = this._buttonHeight;
        bitmap.clear();
        let fill = "rgba(20,24,48,0.9)";
        let stroke = "#8a93c8";
        if (this._buttonState === "correct") {
            fill = "rgba(24,110,60,0.94)";
            stroke = "#7dffb0";
        } else if (this._buttonState === "wrong") {
            fill = "rgba(130,30,40,0.94)";
            stroke = "#ff8a8a";
        } else if (this._buttonHighlight) {
            fill = "rgba(48,70,150,0.96)";
            stroke = "#ffffff";
        }
        drawPanel(bitmap, 2, 2, w - 4, h - 4, 12, fill, stroke, 3);
        bitmap.textColor = "#ffffff";
        bitmap.drawText(this._buttonText, 0, 0, w, h, "center");
    };

    Sprite_MGButton.prototype.onMouseEnter = function() {
        if (this._hoverHandler) {
            this._hoverHandler();
        }
    };

    Sprite_MGButton.prototype.onClick = function() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    };

    //-------------------------------------------------------------------------
    // Scene_MinigameBase : intro -> playing -> result, then sets variables
    //-------------------------------------------------------------------------

    function Scene_MinigameBase() {
        this.initialize(...arguments);
    }

    Scene_MinigameBase.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_MinigameBase.prototype.constructor = Scene_MinigameBase;

    Scene_MinigameBase.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._config = MinigameManager.config() || {};
        this._phase = "intro";
        this._finished = false;
        this._won = false;
        this._score = 0;
        this._inputDelay = 12;
    };

    // No touch-UI cancel button: quitting always goes through quitGame().
    Scene_MinigameBase.prototype.createButtons = function() {
        //
    };

    Scene_MinigameBase.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createTitleLabel();
        this.createGame();
        this.createOverlay();
        this.showIntro();
    };

    // Methods each mini game must provide:
    Scene_MinigameBase.prototype.gameTitle = function() {
        return "Mini Game";
    };

    Scene_MinigameBase.prototype.introText = function() {
        return { title: this.gameTitle(), body: "" };
    };

    Scene_MinigameBase.prototype.createGame = function() {
        //
    };

    Scene_MinigameBase.prototype.onGameStart = function() {
        //
    };

    Scene_MinigameBase.prototype.updateGame = function() {
        //
    };

    Scene_MinigameBase.prototype.createTitleLabel = function() {
        this._titleLabel = new Sprite_MGLabel(Graphics.width, 52, 36, "center", accentColor);
        this._titleLabel.y = 20;
        this._titleLabel.setText(this.gameTitle());
        this.addChild(this._titleLabel);
    };

    Scene_MinigameBase.prototype.createOverlay = function() {
        const w = Math.min(Graphics.width - 40, 600);
        const h = 270;
        const px = Math.floor((Graphics.width - w) / 2);
        const py = Math.floor((Graphics.height - h) / 2);
        this._overlay = new Sprite();

        const dim = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        dim.bitmap.fillAll("rgba(0,0,0,0.55)");
        this._overlay.addChild(dim);

        const panel = new Sprite(newBitmap(w, h));
        drawPanel(panel.bitmap, 2, 2, w - 4, h - 4, 16, "rgba(14,18,40,0.96)", accentColor, 4);
        panel.x = px;
        panel.y = py;
        this._overlay.addChild(panel);

        this._overlayTitle = new Sprite_MGLabel(w - 40, 56, 40, "center", accentColor);
        this._overlayTitle.x = px + 20;
        this._overlayTitle.y = py + 22;
        this._overlay.addChild(this._overlayTitle);

        this._overlayBody = new Sprite_MGLabel(w - 40, 140, 24, "center");
        this._overlayBody.x = px + 20;
        this._overlayBody.y = py + 88;
        this._overlay.addChild(this._overlayBody);

        this._overlayHint = new Sprite_MGLabel(w - 40, 36, 20, "center", "#b8c0ff");
        this._overlayHint.x = px + 20;
        this._overlayHint.y = py + h - 52;
        this._overlay.addChild(this._overlayHint);

        this._overlay.visible = false;
        this.addChild(this._overlay);
    };

    Scene_MinigameBase.prototype.showOverlay = function(title, body, hint, color) {
        this._overlayTitle.setText(title, color || accentColor);
        this._overlayBody.setText(body);
        this._overlayHint.setText(hint);
        this._overlay.visible = true;
    };

    Scene_MinigameBase.prototype.showIntro = function() {
        const intro = this.introText();
        this.showOverlay(intro.title, intro.body, TEXT.startHint);
    };

    Scene_MinigameBase.prototype.startGame = function() {
        this._phase = "playing";
        this._overlay.visible = false;
        this.onGameStart();
    };

    Scene_MinigameBase.prototype.endGame = function(won, score, body) {
        this._won = won;
        this._score = score;
        this._phase = "result";
        this._inputDelay = 20;
        this.showOverlay(
            won ? TEXT.success : TEXT.failure,
            body,
            TEXT.continueHint,
            won ? COLOR_GOOD : COLOR_BAD
        );
    };

    Scene_MinigameBase.prototype.quitGame = function() {
        this._won = false;
        this.finish();
    };

    // Writes the result into the chosen variables and goes back to the map.
    Scene_MinigameBase.prototype.finish = function() {
        if (this._finished) {
            return;
        }
        this._finished = true;
        const cfg = this._config;
        if (cfg.resultVariable > 0) {
            $gameVariables.setValue(cfg.resultVariable, this._won ? cfg.winValue : cfg.loseValue);
        }
        if (cfg.scoreVariable > 0) {
            $gameVariables.setValue(cfg.scoreVariable, this._score);
        }
        SceneManager.pop();
    };

    Scene_MinigameBase.prototype.popScene = function() {
        this.quitGame();
    };

    Scene_MinigameBase.prototype.isConfirmTriggered = function() {
        return this._inputDelay <= 0 && (Input.isTriggered("ok") || TouchInput.isTriggered());
    };

    Scene_MinigameBase.prototype.isCancelTriggered = function() {
        return this._inputDelay <= 0 && (Input.isTriggered("cancel") || TouchInput.isCancelled());
    };

    Scene_MinigameBase.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (this._finished) {
            return;
        }
        if (this._inputDelay > 0) {
            this._inputDelay--;
        }
        if (this._phase === "intro") {
            if (this.isConfirmTriggered()) {
                this.startGame();
            } else if (allowQuit && this.isCancelTriggered()) {
                this.quitGame();
            }
            return;
        }
        if (this._phase === "result") {
            if (this.isConfirmTriggered() || this.isCancelTriggered()) {
                this.finish();
            }
            return;
        }
        if (allowQuit && this.isCancelTriggered()) {
            this.quitGame();
            return;
        }
        this.updateGame();
    };

    //=========================================================================
    // RHYTHM
    //=========================================================================

    function Scene_MGRhythm() {
        this.initialize(...arguments);
    }

    Scene_MGRhythm.prototype = Object.create(Scene_MinigameBase.prototype);
    Scene_MGRhythm.prototype.constructor = Scene_MGRhythm;

    const RHYTHM_PIP_COLORS = {
        pending: "#555a7a",
        perfect: "#ffd36b",
        good: "#7dffb0",
        miss: "#ff6b6b"
    };

    Scene_MGRhythm.prototype.gameTitle = function() {
        return "Rhythm Challenge";
    };

    Scene_MGRhythm.prototype.introText = function() {
        return {
            title: "Rhythm Challenge",
            body: "Listen to the beat!\n" +
                "Press Enter / Z or click when each note\n" +
                "reaches the ring.\n" +
                "Hit " + this._needed + " of " + this._noteCount + " notes to win."
        };
    };

    Scene_MGRhythm.prototype.createGame = function() {
        const cfg = this._config;
        this._beat = 60000 / Math.max(30, cfg.bpm || 90);
        this._noteCount = Math.max(1, Math.min(12, cfg.notes || 3));
        this._needed = cfg.neededHits > 0 ? Math.min(cfg.neededHits, this._noteCount) : this._noteCount;
        this._metronome = cfg.metronome !== false;
        this._approach = this._beat * 2;
        this._laneY = Math.floor(Graphics.height * 0.46);
        this._targetX = Math.floor(Graphics.width * 0.2);
        this._spawnX = Graphics.width + 50;
        this._time = 0;
        this._tickIndex = 0;
        this._hits = 0;
        this._flash = 0;
        this._popupTimer = 0;
        this._endTimer = -1;

        // Lane
        const lane = new Sprite(new Bitmap(Graphics.width, 12));
        lane.bitmap.fillAll("rgba(255,255,255,0.18)");
        lane.y = this._laneY - 6;
        this.addChild(lane);

        // Target ring
        const size = 112;
        this._target = new Sprite(new Bitmap(size, size));
        this._target.bitmap.drawCircle(size / 2, size / 2, size / 2 - 2, "#ffffff");
        this._target.bitmap.drawCircle(size / 2, size / 2, size / 2 - 9, "#1b2250");
        this._target.anchor.set(0.5, 0.5);
        this._target.x = this._targetX;
        this._target.y = this._laneY;
        this.addChild(this._target);

        // Notes
        this._notes = [];
        const noteSize = 72;
        for (let i = 0; i < this._noteCount; i++) {
            const bitmap = new Bitmap(noteSize, noteSize);
            bitmap.drawCircle(noteSize / 2, noteSize / 2, noteSize / 2 - 2, "#ffffff");
            bitmap.drawCircle(noteSize / 2, noteSize / 2, noteSize / 2 - 7, accentColor);
            const sprite = new Sprite(bitmap);
            sprite.anchor.set(0.5, 0.5);
            sprite.y = this._laneY;
            sprite.visible = false;
            this.addChild(sprite);
            this._notes.push({ time: this._beat * (2 + i), judged: false, result: null, sprite: sprite });
        }

        // Result pips (one per note)
        this._pips = [];
        const pipSpacing = 40;
        const pipStart = Graphics.width / 2 - ((this._noteCount - 1) * pipSpacing) / 2;
        for (let i = 0; i < this._noteCount; i++) {
            const pip = new Sprite(new Bitmap(26, 26));
            pip.anchor.set(0.5, 0.5);
            pip.x = pipStart + i * pipSpacing;
            pip.y = this._laneY + 150;
            this.addChild(pip);
            this._pips.push(pip);
            this.drawPip(i, RHYTHM_PIP_COLORS.pending);
        }

        // Labels
        this._countLabel = new Sprite_MGLabel(Graphics.width, 80, 64, "center", "#ffffff");
        this._countLabel.y = this._laneY - 190;
        this.addChild(this._countLabel);

        this._popup = new Sprite_MGLabel(240, 50, 34, "center");
        this._popup.anchor.set(0.5, 0.5);
        this._popup.x = this._targetX;
        this._popup.y = this._laneY - 100;
        this._popup.opacity = 0;
        this.addChild(this._popup);

        this._hitsLabel = new Sprite_MGLabel(Graphics.width, 36, 24, "center", "#b8c0ff");
        this._hitsLabel.y = this._laneY + 190;
        this.addChild(this._hitsLabel);
        this.refreshHits();
    };

    Scene_MGRhythm.prototype.drawPip = function(index, color) {
        const bitmap = this._pips[index].bitmap;
        bitmap.clear();
        bitmap.drawCircle(13, 13, 12, color);
    };

    Scene_MGRhythm.prototype.refreshHits = function() {
        this._hitsLabel.setText("Hits: " + this._hits + " / " + this._needed + " needed");
    };

    Scene_MGRhythm.prototype.onGameStart = function() {
        this._time = 0;
        this._tickIndex = 0;
    };

    Scene_MGRhythm.prototype.updateGame = function() {
        this._time += FRAME_MS;
        this.updateTicks();
        if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
            this.onTap();
        }
        this.updateNotes();
        this.updateEffects();
        if (this._endTimer < 0 && this._notes.every(n => n.judged)) {
            this._endTimer = 40;
        }
        if (this._endTimer >= 0) {
            this._endTimer--;
            if (this._endTimer < 0) {
                this.finishRhythm();
            }
        }
    };

    Scene_MGRhythm.prototype.updateTicks = function() {
        const totalBeats = 2 + this._noteCount;
        while (this._tickIndex < totalBeats && this._time >= this._tickIndex * this._beat) {
            if (this._metronome) {
                SoundManager.playCursor();
            }
            if (this._tickIndex === 0) {
                this._countLabel.setText("1");
            } else if (this._tickIndex === 1) {
                this._countLabel.setText("2");
            } else if (this._tickIndex === 2) {
                this._countLabel.setText("GO!", accentColor);
            }
            this._tickIndex++;
        }
    };

    Scene_MGRhythm.prototype.updateNotes = function() {
        const spread = this._spawnX - this._targetX;
        for (const note of this._notes) {
            const x = this._targetX + ((note.time - this._time) / this._approach) * spread;
            note.sprite.x = x;
            const onScreen = x < this._spawnX && x > -60;
            const hiddenByHit = note.judged && note.result !== "miss";
            note.sprite.visible = onScreen && !hiddenByHit;
            if (!note.judged && this._time - note.time > goodWindow) {
                this.judgeNote(note, "miss");
            }
        }
    };

    Scene_MGRhythm.prototype.onTap = function() {
        const note = this._notes.find(n => !n.judged);
        if (!note) {
            return;
        }
        const dt = this._time - note.time;
        const earlyLimit = Math.max(goodWindow * 2, 260);
        if (dt < -earlyLimit) {
            return; // Too early: ignored.
        }
        const diff = Math.abs(dt);
        if (diff <= perfectWindow) {
            this.judgeNote(note, "perfect");
        } else if (diff <= goodWindow) {
            this.judgeNote(note, "good");
        } else {
            this.judgeNote(note, "miss");
        }
    };

    Scene_MGRhythm.prototype.judgeNote = function(note, result) {
        note.judged = true;
        note.result = result;
        const index = this._notes.indexOf(note);
        this.drawPip(index, RHYTHM_PIP_COLORS[result]);
        if (result === "miss") {
            note.sprite.setBlendColor([255, 80, 80, 140]);
            SoundManager.playBuzzer();
            this.showPopup("Miss", COLOR_BAD);
        } else {
            this._hits++;
            SoundManager.playOk();
            this.showPopup(result === "perfect" ? "Perfect!" : "Good", result === "perfect" ? accentColor : COLOR_GOOD);
            this._flash = 10;
        }
        this.refreshHits();
    };

    Scene_MGRhythm.prototype.showPopup = function(text, color) {
        this._popup.setText(text, color);
        this._popup.opacity = 255;
        this._popupTimer = 45;
    };

    Scene_MGRhythm.prototype.updateEffects = function() {
        if (this._popupTimer > 0) {
            this._popupTimer--;
            this._popup.opacity = Math.min(255, this._popupTimer * 10);
        }
        if (this._flash > 0) {
            this._flash--;
        }
        const scale = 1 + this._flash * 0.03;
        this._target.scale.set(scale, scale);
    };

    Scene_MGRhythm.prototype.finishRhythm = function() {
        const won = this._hits >= this._needed;
        const body = won
            ? "You hit " + this._hits + " of " + this._noteCount + " notes.\nGreat sense of rhythm!"
            : "You hit " + this._hits + " of " + this._noteCount + " notes (needed " + this._needed + ").\nTry to stay on the beat!";
        this.endGame(won, this._hits, body);
    };

    //=========================================================================
    // MEMORY
    //=========================================================================

    function Sprite_MGCard() {
        this.initialize(...arguments);
    }

    Sprite_MGCard.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_MGCard.prototype.constructor = Sprite_MGCard;

    Sprite_MGCard.prototype.initialize = function(width, height, iconIndex) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._cardWidth = width;
        this._cardHeight = height;
        this._iconIndex = iconIndex;
        this._up = false;
        this._matched = false;
        this._anim = -1;
        this._swapped = false;
        this._backBitmap = null;
        this._faceBitmap = null;
        this._hoverHandler = null;
        this._clickHandler = null;
        this.anchor.set(0.5, 0.5);
    };

    Sprite_MGCard.prototype.iconIndex = function() {
        return this._iconIndex;
    };

    Sprite_MGCard.prototype.isUp = function() {
        return this._up;
    };

    Sprite_MGCard.prototype.isMatched = function() {
        return this._matched;
    };

    Sprite_MGCard.prototype.isFlipping = function() {
        return this._anim >= 0;
    };

    Sprite_MGCard.prototype.buildBitmaps = function(iconSet) {
        const w = this._cardWidth;
        const h = this._cardHeight;

        const back = newBitmap(w, h, Math.floor(h * 0.45));
        drawPanel(back, 3, 3, w - 6, h - 6, 10, "rgba(40,50,120,0.96)", "#aab4ff", 3);
        back.drawText("?", 0, 0, w, h, "center");
        this._backBitmap = back;

        const face = newBitmap(w, h);
        drawPanel(face, 3, 3, w - 6, h - 6, 10, "rgba(235,238,255,0.97)", "#ffffff", 3);
        const size = Math.floor(Math.min(w, h) * 0.62);
        const sx = (this._iconIndex % 16) * 32;
        const sy = Math.floor(this._iconIndex / 16) * 32;
        face.blt(iconSet, sx, sy, 32, 32, Math.floor((w - size) / 2), Math.floor((h - size) / 2), size, size);
        this._faceBitmap = face;

        this.bitmap = this._up ? face : back;
    };

    Sprite_MGCard.prototype.setUp = function(up, animate) {
        this._up = up;
        if (animate) {
            this._anim = 0;
            this._swapped = false;
        } else {
            this._anim = -1;
            this.scale.x = 1;
            this.bitmap = up ? this._faceBitmap : this._backBitmap;
        }
    };

    Sprite_MGCard.prototype.setMatched = function() {
        this._matched = true;
        this.setColorTone([-40, 50, -40, 0]);
    };

    Sprite_MGCard.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        this.updateFlip();
    };

    Sprite_MGCard.prototype.updateFlip = function() {
        if (this._anim < 0) {
            return;
        }
        this._anim++;
        const p = this._anim / 12;
        if (p < 0.5) {
            this.scale.x = Math.max(0.02, 1 - p * 2);
        } else {
            if (!this._swapped) {
                this.bitmap = this._up ? this._faceBitmap : this._backBitmap;
                this._swapped = true;
            }
            this.scale.x = Math.min(1, (p - 0.5) * 2);
        }
        if (this._anim >= 12) {
            this._anim = -1;
            this.scale.x = 1;
        }
    };

    Sprite_MGCard.prototype.onMouseEnter = function() {
        if (this._hoverHandler) {
            this._hoverHandler();
        }
    };

    Sprite_MGCard.prototype.onClick = function() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    };

    function Scene_MGMemory() {
        this.initialize(...arguments);
    }

    Scene_MGMemory.prototype = Object.create(Scene_MinigameBase.prototype);
    Scene_MGMemory.prototype.constructor = Scene_MGMemory;

    Scene_MGMemory.prototype.gameTitle = function() {
        return "Memory Match";
    };

    Scene_MGMemory.prototype.introText = function() {
        let body = "Memorize the cards, then\nfind all " + this._pairs + " matching pairs.";
        if (this._maxMistakes > 0) {
            body += "\nYou lose after " + this._maxMistakes + " mistakes.";
        }
        if (this._timeLimit > 0) {
            body += "\nTime limit: " + this._timeLimit + " seconds.";
        }
        return { title: "Memory Match", body: body };
    };

    Scene_MGMemory.prototype.createGame = function() {
        const cfg = this._config;
        this._pairs = Math.max(2, Math.min(18, cfg.pairs || 6));
        this._maxMistakes = Math.max(0, cfg.maxMistakes || 0);
        this._timeLimit = Math.max(0, cfg.timeLimit || 0);
        this._previewSeconds = Math.max(0, cfg.previewSeconds || 0);
        this._iconSet = ImageManager.loadSystem("IconSet");
        this._mode = "wait";
        this._timer = 0;
        this._timeLeft = this._timeLimit;
        this._mistakes = 0;
        this._found = 0;
        this._open = [];
        this._cursorIndex = 0;

        // Deck
        let icons = shuffle(memoryIcons.slice());
        let extra = 64;
        while (icons.length < this._pairs) {
            if (!icons.includes(extra)) {
                icons.push(extra);
            }
            extra++;
        }
        icons = icons.slice(0, this._pairs);
        const deck = shuffle(icons.concat(icons));

        // Layout
        const total = deck.length;
        let cols = 4;
        if (total > 16 && total <= 20) {
            cols = 5;
        } else if (total > 20) {
            cols = 6;
        }
        const rows = Math.ceil(total / cols);
        this._cols = cols;
        const gap = 12;
        const areaTop = 130;
        const areaBottom = Graphics.height - 70;
        const areaWidth = Graphics.width - 80;
        const cardW = Math.floor(Math.min(110, (areaWidth - gap * (cols - 1)) / cols));
        const cardH = Math.floor(Math.min(130, (areaBottom - areaTop - gap * (rows - 1)) / rows));
        const gridW = cols * cardW + gap * (cols - 1);
        const gridH = rows * cardH + gap * (rows - 1);
        const left = (Graphics.width - gridW) / 2;
        const top = areaTop + (areaBottom - areaTop - gridH) / 2;

        this._cards = deck.map((icon, i) => {
            const card = new Sprite_MGCard(cardW, cardH, icon);
            card.x = left + (i % cols) * (cardW + gap) + cardW / 2;
            card.y = top + Math.floor(i / cols) * (cardH + gap) + cardH / 2;
            card._hoverHandler = () => this.onCardHover(i);
            card._clickHandler = () => this.onCardClick(i);
            this.addChild(card);
            return card;
        });

        // Cursor frame
        const cursorBitmap = new Bitmap(cardW + 10, cardH + 10);
        drawPanel(cursorBitmap, 2, 2, cardW + 6, cardH + 6, 12, null, accentColor, 4);
        this._cursor = new Sprite(cursorBitmap);
        this._cursor.anchor.set(0.5, 0.5);
        this._cursor.visible = false;
        this.addChild(this._cursor);

        // HUD
        this._pairsLabel = new Sprite_MGLabel(240, 36, 24, "left", "#b8c0ff");
        this._pairsLabel.x = 40;
        this._pairsLabel.y = 84;
        this.addChild(this._pairsLabel);

        this._mistakesLabel = new Sprite_MGLabel(300, 36, 24, "center", "#b8c0ff");
        this._mistakesLabel.x = (Graphics.width - 300) / 2;
        this._mistakesLabel.y = 84;
        this.addChild(this._mistakesLabel);

        this._timeLabel = new Sprite_MGLabel(240, 36, 24, "right", "#b8c0ff");
        this._timeLabel.x = Graphics.width - 40 - 240;
        this._timeLabel.y = 84;
        this.addChild(this._timeLabel);

        this._statusLabel = new Sprite_MGLabel(Graphics.width, 40, 28, "center", accentColor);
        this._statusLabel.y = Graphics.height - 56;
        this.addChild(this._statusLabel);

        this.refreshHud();
    };

    Scene_MGMemory.prototype.start = function() {
        Scene_MinigameBase.prototype.start.call(this);
        this._cards.forEach(card => card.buildBitmaps(this._iconSet));
    };

    Scene_MGMemory.prototype.refreshHud = function() {
        this._pairsLabel.setText("Pairs: " + this._found + " / " + this._pairs);
        const mistakes = this._maxMistakes > 0
            ? "Mistakes: " + this._mistakes + " / " + this._maxMistakes
            : "Mistakes: " + this._mistakes;
        this._mistakesLabel.setText(mistakes);
        if (this._timeLimit > 0) {
            const t = Math.max(0, Math.ceil(this._timeLeft));
            const m = Math.floor(t / 60);
            const s = t % 60;
            this._timeLabel.setText("Time: " + m + ":" + (s < 10 ? "0" : "") + s);
        } else {
            this._timeLabel.setText("");
        }
    };

    Scene_MGMemory.prototype.onGameStart = function() {
        if (this._previewSeconds > 0) {
            this._cards.forEach(card => card.setUp(true, false));
            this._mode = "preview";
            this._timer = Math.max(1, Math.round(this._previewSeconds * 60));
        } else {
            this.beginPicking();
        }
    };

    Scene_MGMemory.prototype.beginPicking = function() {
        this._mode = "pick";
        this._statusLabel.setText("Find the pairs!");
        this._cursor.visible = true;
        this.updateCursorPosition();
    };

    Scene_MGMemory.prototype.updateGame = function() {
        if (this._mode === "preview") {
            this._timer--;
            this._statusLabel.setText("Memorize!  " + Math.ceil(this._timer / 60));
            if (this._timer <= 0) {
                this._cards.forEach(card => card.setUp(false, true));
                this.beginPicking();
            }
            return;
        }
        if (this._mode === "pick" || this._mode === "checking") {
            this.updateCursorInput();
            this.updateTimeLimit();
            if (this._finishedInternally) {
                return;
            }
        }
        if (this._mode === "checking") {
            this._timer--;
            if (this._timer <= 0) {
                this.resolvePair();
            }
        }
        this.refreshHud();
        this.updateCursorPosition();
    };

    Scene_MGMemory.prototype.updateTimeLimit = function() {
        if (this._timeLimit <= 0) {
            return;
        }
        this._timeLeft -= 1 / 60;
        if (this._timeLeft <= 0) {
            this._timeLeft = 0;
            this.refreshHud();
            this._finishedInternally = true;
            this._mode = "done";
            this.endGame(false, this._mistakes, "Time's up!\nYou found " + this._found + " of " + this._pairs + " pairs.");
        }
    };

    Scene_MGMemory.prototype.updateCursorInput = function() {
        const total = this._cards.length;
        const cols = this._cols;
        let index = this._cursorIndex;
        if (Input.isRepeated("left") && index % cols > 0) {
            index--;
        } else if (Input.isRepeated("right") && index % cols < cols - 1 && index + 1 < total) {
            index++;
        } else if (Input.isRepeated("up") && index - cols >= 0) {
            index -= cols;
        } else if (Input.isRepeated("down") && index + cols < total) {
            index += cols;
        }
        if (index !== this._cursorIndex) {
            this._cursorIndex = index;
            SoundManager.playCursor();
        }
        if (Input.isTriggered("ok")) {
            this.pickCard(this._cursorIndex);
        }
    };

    Scene_MGMemory.prototype.updateCursorPosition = function() {
        const card = this._cards[this._cursorIndex];
        if (card) {
            this._cursor.x = card.x;
            this._cursor.y = card.y;
        }
    };

    Scene_MGMemory.prototype.onCardHover = function(index) {
        if (this._phase === "playing" && (this._mode === "pick" || this._mode === "checking")) {
            this._cursorIndex = index;
        }
    };

    Scene_MGMemory.prototype.onCardClick = function(index) {
        if (this._phase === "playing" && this._mode === "pick") {
            this._cursorIndex = index;
            this.pickCard(index);
        }
    };

    Scene_MGMemory.prototype.pickCard = function(index) {
        if (this._mode !== "pick") {
            return;
        }
        const card = this._cards[index];
        if (!card || card.isMatched() || card.isUp()) {
            return;
        }
        card.setUp(true, true);
        SoundManager.playCursor();
        this._open.push(card);
        if (this._open.length === 2) {
            this._mode = "checking";
            this._timer = 50;
        }
    };

    Scene_MGMemory.prototype.resolvePair = function() {
        const a = this._open[0];
        const b = this._open[1];
        this._open = [];
        if (a.iconIndex() === b.iconIndex()) {
            a.setMatched();
            b.setMatched();
            this._found++;
            SoundManager.playOk();
        } else {
            a.setUp(false, true);
            b.setUp(false, true);
            this._mistakes++;
            SoundManager.playBuzzer();
        }
        this._mode = "pick";
        this.refreshHud();
        if (this._found >= this._pairs) {
            this._mode = "done";
            this._finishedInternally = true;
            this._cursor.visible = false;
            this.endGame(
                true,
                this._mistakes,
                "You found all " + this._pairs + " pairs!\nMistakes: " + this._mistakes
            );
        } else if (this._maxMistakes > 0 && this._mistakes >= this._maxMistakes) {
            this._mode = "done";
            this._finishedInternally = true;
            this._cursor.visible = false;
            this.endGame(
                false,
                this._mistakes,
                "Too many mistakes!\nYou found " + this._found + " of " + this._pairs + " pairs."
            );
        }
    };

    //=========================================================================
    // MATH
    //=========================================================================

    const MATH_LEVELS = {
        easy: { addMax: 20, mulMax: 5 },
        normal: { addMax: 99, mulMax: 10 },
        hard: { addMax: 500, mulMax: 15 }
    };

    function parseOperations(text) {
        const ops = [];
        for (const ch of String(text || "")) {
            let op = null;
            if (ch === "+") {
                op = "+";
            } else if (ch === "-" || ch === "\u2212") {
                op = "-";
            } else if (ch === "*" || ch === "x" || ch === "X" || ch === "\u00d7") {
                op = "*";
            } else if (ch === "/" || ch === "\u00f7") {
                op = "/";
            }
            if (op && !ops.includes(op)) {
                ops.push(op);
            }
        }
        return ops.length > 0 ? ops : ["+"];
    }

    function makeQuestion(level, ops) {
        const cfg = MATH_LEVELS[level] || MATH_LEVELS.normal;
        const op = ops[randInt(0, ops.length - 1)];
        const low = Math.max(1, Math.ceil(cfg.addMax / 5));
        let a, b, answer, symbol;
        switch (op) {
            case "+":
                a = randInt(low, cfg.addMax);
                b = randInt(low, cfg.addMax);
                answer = a + b;
                symbol = "+";
                break;
            case "-":
                a = randInt(low, cfg.addMax);
                b = randInt(1, a);
                answer = a - b;
                symbol = "-";
                break;
            case "*":
                a = randInt(2, cfg.mulMax);
                b = randInt(2, cfg.mulMax);
                answer = a * b;
                symbol = "\u00d7";
                break;
            default:
                b = randInt(2, cfg.mulMax);
                answer = randInt(2, cfg.mulMax);
                a = b * answer;
                symbol = "\u00f7";
                break;
        }
        return { text: a + " " + symbol + " " + b + " = ?", answer: answer };
    }

    function makeOptions(answer) {
        const set = new Set([answer]);
        const spread = Math.max(3, Math.round(Math.abs(answer) * 0.2));
        let guard = 0;
        while (set.size < 4 && guard < 200) {
            guard++;
            const offset = randInt(1, spread) * (Math.random() < 0.5 ? -1 : 1);
            const value = answer + offset;
            if (value >= 0) {
                set.add(value);
            }
        }
        let extra = 1;
        while (set.size < 4) {
            set.add(answer + extra);
            extra++;
        }
        return shuffle(Array.from(set));
    }

    function Scene_MGMath() {
        this.initialize(...arguments);
    }

    Scene_MGMath.prototype = Object.create(Scene_MinigameBase.prototype);
    Scene_MGMath.prototype.constructor = Scene_MGMath;

    Scene_MGMath.prototype.gameTitle = function() {
        return "Math Challenge";
    };

    Scene_MGMath.prototype.introText = function() {
        let body = "Solve " + this._questionCount + " math questions.\n" +
            "Pick the answer with the mouse, or use\n" +
            "the arrow keys and Enter.\n" +
            "Get " + this._needed + " right to win.";
        if (this._timePerQuestion > 0) {
            body += "\n" + this._timePerQuestion + " seconds per question!";
        }
        return { title: "Math Challenge", body: body };
    };

    Scene_MGMath.prototype.createGame = function() {
        const cfg = this._config;
        this._questionCount = Math.max(1, Math.min(30, cfg.questions || 5));
        this._needed = cfg.neededCorrect > 0 ? Math.min(cfg.neededCorrect, this._questionCount) : this._questionCount;
        this._timePerQuestion = Math.max(0, cfg.timePerQuestion || 0);
        const ops = parseOperations(cfg.operations);
        this._questions = [];
        for (let i = 0; i < this._questionCount; i++) {
            this._questions.push(makeQuestion(cfg.difficulty, ops));
        }
        this._qIndex = 0;
        this._correct = 0;
        this._mode = "wait";
        this._feedbackTimer = 0;
        this._selected = 0;
        this._options = [0, 0, 0, 0];
        this._qTime = 0;

        // Question panel
        const pw = Math.min(Graphics.width - 60, 640);
        const ph = 140;
        const px = Math.floor((Graphics.width - pw) / 2);
        const py = Math.floor(Graphics.height * 0.24);
        const panel = new Sprite(newBitmap(pw, ph));
        drawPanel(panel.bitmap, 2, 2, pw - 4, ph - 4, 16, "rgba(14,18,40,0.92)", accentColor, 4);
        panel.x = px;
        panel.y = py;
        this.addChild(panel);

        this._questionLabel = new Sprite_MGLabel(pw - 20, 90, 64, "center", "#ffffff");
        this._questionLabel.x = px + 10;
        this._questionLabel.y = py + 34;
        this.addChild(this._questionLabel);

        this._progressLabel = new Sprite_MGLabel(300, 36, 24, "left", "#b8c0ff");
        this._progressLabel.x = 40;
        this._progressLabel.y = 84;
        this.addChild(this._progressLabel);

        this._scoreLabel = new Sprite_MGLabel(240, 36, 24, "right", "#b8c0ff");
        this._scoreLabel.x = Graphics.width - 40 - 240;
        this._scoreLabel.y = 84;
        this.addChild(this._scoreLabel);

        this._timerLabel = new Sprite_MGLabel(Graphics.width, 36, 24, "center", "#b8c0ff");
        this._timerLabel.y = py + ph + 8;
        this.addChild(this._timerLabel);

        this._feedbackLabel = new Sprite_MGLabel(Graphics.width, 44, 32, "center", "#ffffff");
        this._feedbackLabel.y = py + ph + 48;
        this.addChild(this._feedbackLabel);

        // Answer buttons (2 x 2)
        const gap = 20;
        const bw = Math.min(300, Math.floor((Graphics.width - 60 - gap) / 2));
        const bh = 70;
        const left = Math.floor((Graphics.width - (bw * 2 + gap)) / 2);
        const top = Math.floor(Graphics.height * 0.62);
        this._buttons = [];
        for (let i = 0; i < 4; i++) {
            const button = new Sprite_MGButton(bw, bh, 34);
            button.x = left + (i % 2) * (bw + gap);
            button.y = top + Math.floor(i / 2) * (bh + gap);
            button._hoverHandler = () => this.onButtonHover(i);
            button._clickHandler = () => this.onButtonClick(i);
            this.addChild(button);
            this._buttons.push(button);
        }
        this.refreshHud();
    };

    Scene_MGMath.prototype.refreshHud = function() {
        const shown = Math.min(this._qIndex + 1, this._questionCount);
        this._progressLabel.setText("Question " + shown + " / " + this._questionCount);
        this._scoreLabel.setText("Correct: " + this._correct);
    };

    Scene_MGMath.prototype.onGameStart = function() {
        this.showQuestion();
    };

    Scene_MGMath.prototype.showQuestion = function() {
        const q = this._questions[this._qIndex];
        this._options = makeOptions(q.answer);
        this._questionLabel.setText(q.text);
        this._feedbackLabel.setText("");
        this._buttons.forEach((button, i) => {
            button.setText(String(this._options[i]));
            button.setState("normal");
        });
        this._selected = 0;
        this._qTime = this._timePerQuestion;
        this._mode = "ask";
        this.refreshHud();
    };

    Scene_MGMath.prototype.updateGame = function() {
        if (this._mode === "ask") {
            this.updateSelectionInput();
            this.updateQuestionTimer();
        } else if (this._mode === "feedback") {
            this._feedbackTimer--;
            if (this._feedbackTimer <= 0) {
                this.nextQuestion();
            }
        }
        this._buttons.forEach((button, i) => {
            button.setHighlight(this._mode === "ask" && i === this._selected);
        });
    };

    Scene_MGMath.prototype.updateSelectionInput = function() {
        let index = this._selected;
        if (Input.isRepeated("left") && index % 2 === 1) {
            index--;
        } else if (Input.isRepeated("right") && index % 2 === 0) {
            index++;
        } else if (Input.isRepeated("up") && index >= 2) {
            index -= 2;
        } else if (Input.isRepeated("down") && index < 2) {
            index += 2;
        }
        if (index !== this._selected) {
            this._selected = index;
            SoundManager.playCursor();
        }
        if (Input.isTriggered("ok")) {
            this.answer(this._selected);
        }
    };

    Scene_MGMath.prototype.updateQuestionTimer = function() {
        if (this._timePerQuestion <= 0) {
            this._timerLabel.setText("");
            return;
        }
        this._qTime -= 1 / 60;
        this._timerLabel.setText("Time: " + Math.max(0, Math.ceil(this._qTime)));
        if (this._qTime <= 0) {
            this.answer(-1);
        }
    };

    Scene_MGMath.prototype.onButtonHover = function(index) {
        if (this._phase === "playing" && this._mode === "ask") {
            this._selected = index;
        }
    };

    Scene_MGMath.prototype.onButtonClick = function(index) {
        if (this._phase === "playing" && this._mode === "ask") {
            this._selected = index;
            this.answer(index);
        }
    };

    // index = chosen button, or -1 when time runs out.
    Scene_MGMath.prototype.answer = function(index) {
        if (this._mode !== "ask") {
            return;
        }
        const q = this._questions[this._qIndex];
        const correctIndex = this._options.indexOf(q.answer);
        this._mode = "feedback";
        this._feedbackTimer = 55;
        if (index === correctIndex) {
            this._correct++;
            this._buttons[index].setState("correct");
            this._feedbackLabel.setText("Correct!", COLOR_GOOD);
            SoundManager.playOk();
        } else {
            if (index >= 0) {
                this._buttons[index].setState("wrong");
                this._feedbackLabel.setText("Wrong! The answer is " + q.answer, COLOR_BAD);
            } else {
                this._feedbackLabel.setText("Time's up! The answer is " + q.answer, COLOR_BAD);
            }
            this._buttons[correctIndex].setState("correct");
            SoundManager.playBuzzer();
        }
        this.refreshHud();
    };

    Scene_MGMath.prototype.nextQuestion = function() {
        this._qIndex++;
        if (this._qIndex >= this._questionCount) {
            this._mode = "done";
            const won = this._correct >= this._needed;
            const body = won
                ? "You answered " + this._correct + " of " + this._questionCount + " correctly.\nWell done!"
                : "You answered " + this._correct + " of " + this._questionCount + " correctly (needed " + this._needed + ").\nBetter luck next time!";
            this.endGame(won, this._correct, body);
        } else {
            this.showQuestion();
        }
    };

    //-------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------

    window.Scene_MGRhythm = Scene_MGRhythm;
    window.Scene_MGMemory = Scene_MGMemory;
    window.Scene_MGMath = Scene_MGMath;
})();
