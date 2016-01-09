import Canvas = etch.drawing.Canvas;
import IDisplayObject = etch.drawing.IDisplayObject;
import Point = minerva.Point;
import {AnimationsLayer} from './UI/AnimationsLayer';
import {BlockSprites} from "./Blocks/BlockSprites";
import {CommandManager} from './Core/Commands/CommandManager';
import {CommandsInputManager} from './Core/Inputs/CommandsInputManager';
import {DragFileInputManager} from './Core/Inputs/DragFileInputManager';
import {IAudio} from './Core/Audio/IAudio';
import {IBlock} from './Blocks/IBlock';
import {IConfig} from './IConfig';
import {IEffect} from './Blocks/IEffect';
import {InputManager} from './Core/Inputs/InputManager';
import {IPowerEffect} from './Blocks/Power/IPowerEffect';
import {IPowerSource} from './Blocks/Power/IPowerSource';
import {ISource} from './Blocks/ISource';
import {MainScene} from './MainScene';
import {Metrics} from './AppMetrics';
import {OperationManager} from './Core/Operations/OperationManager';
import {Particle} from './Particle'; // todo: should be IParticle
import {PianoKeyboardManager} from './Core/Inputs/PianoKeyboardManager';
import {PointerInputManager} from './Core/Inputs/PointerInputManager';
import {PooledFactoryResource} from './Core/Resources/PooledFactoryResource';
import {ResourceManager} from './Core/Resources/ResourceManager';
import {Serializer} from './Serializer';
import {Splash} from './Splash';
import {Stage} from "./Stage";
import {ThemeManager} from "./UI/ThemeManager";
import {TypingManager} from './Core/Inputs/TypingManager';

export interface IApp {
    AnimationsLayer: AnimationsLayer;
    Audio: IAudio;
    Blocks: IBlock[];
    BlockSprites: BlockSprites;
    Canvas: Canvas;
    CommandManager: CommandManager;
    CommandsInputManager: CommandsInputManager;
    CompositionId: string;
    CompositionLoaded: nullstone.Event<nullstone.IEventArgs>;
    Config: IConfig;
    DragFileInputManager: DragFileInputManager;
    DragOffset: Point;
    Effects: IEffect[];
    GridSize: number;
    Height: number;
    InputManager: InputManager;
    IsLoadingComposition: boolean;
    PianoKeyboardManager: PianoKeyboardManager;
    MainScene: MainScene;
    Metrics: Metrics;
    OperationManager: OperationManager;
    Palette: string[];
    Particles: Particle[];
    ParticlesPool: PooledFactoryResource<Particle>;
    PointerInputManager: PointerInputManager;
    PowerEffects: IPowerEffect[];
    PowerSources: IPowerSource[];
    ResourceManager: ResourceManager;
    ScaledDragOffset: Point;
    ScaledGridSize: number;
    ScaledUnit: number;
    SessionId: string;
    Sources: ISource[];
    SubCanvas: HTMLCanvasElement[];
    Stage: Stage;
    ThemeManager: ThemeManager;
    TypingManager: TypingManager;
    Unit: number;
    Width: number;
    ZoomLevel: number;

    Deserialize(json: string): any;
    GetBlockId(): number;
    LoadReady(): void;
    Message(message?: string, options?: any): void;
    Serialize(): string;
    Setup(): void;
}
