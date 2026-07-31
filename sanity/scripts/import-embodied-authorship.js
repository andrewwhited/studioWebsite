/* Import "Embodied Authorship" from the Notion record page into Sanity.
 *
 * Creates a DRAFT only (drafts.thought-embodied-authorship). The live site
 * reads the published perspective, so nothing renders until Andrew publishes
 * from the Studio.
 *
 * Body text is verbatim from Notion. Do not edit prose here — edit Notion and
 * re-run. Run with:
 *   npx sanity exec scripts/import-embodied-authorship.js --with-user-token
 *
 * esbuild rejects top-level await in these scripts, so this uses .then().
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const DRAFT_ID = 'drafts.thought-embodied-authorship'

/* ---- key generation ----
   Deterministic so a re-run produces the same keys and Sanity sees a real
   diff rather than every block replaced. */
let n = 0
const k = (prefix) => `${prefix}${(n += 1)}`

/* ---- block builders ---- */

// Plain paragraph.
const p = (text) => ({
  _type: 'block',
  _key: k('b'),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: k('s'), text, marks: []}],
})

// Paragraph with inline marks: pass an array of [text, ...marks] pairs.
// markDefs carries the footnote/link definitions those marks point at.
const rich = (runs, markDefs = []) => ({
  _type: 'block',
  _key: k('b'),
  style: 'normal',
  markDefs,
  children: runs.map(([text, ...marks]) => ({
    _type: 'span',
    _key: k('s'),
    text,
    marks,
  })),
})

// Footnote annotation. `text` is the note; `url` makes the whole note a link.
const fn = (key, text, url) => ({_type: 'footnote', _key: key, text, ...(url ? {url} : {})})

const prose = (...blocks) => ({_type: 'essayProseBlock', _key: k('p'), body: blocks})
const heading = (title) => ({_type: 'essayHeading', _key: k('h'), title})
const breakBlock = (note) => ({_type: 'sectionBreak', _key: k('x'), note})
const epigraph = (text, attribution) => ({
  _type: 'epigraph',
  _key: k('e'),
  text,
  ...(attribution ? {attribution} : {}),
})
const pullQuote = (text) => ({_type: 'pullQuote', _key: k('q'), text})

const figure = (label, ratio) => ({
  _type: 'figure',
  _key: k('f'),
  placeholder: true,
  placeholderLabel: label,
  placeholderRatio: ratio,
  width: 'measure',
})

// figureFlow has no placeholder mode of its own, so a flow that has no art yet
// is represented as a single placeholder figure carrying the frame count.
// Swap to a real figureFlow once the images exist.
const flow = (count, label, ratio) => ({
  _type: 'figure',
  _key: k('f'),
  placeholder: true,
  placeholderLabel: `FLOW (${count}) — ${label}`,
  placeholderRatio: ratio,
  width: 'wide',
})

/* ---- body ---- */

const body = [
  // Not his words and not part of the prose — the LinkedIn post the essay is
  // about, held up before the piece starts.
  epigraph("AI won't replace [insert profession]. [Insert professional] using AI will!"),
  prose(
    p(
      'I saw that post, then I saw it again. When I went looking, I found forty more. The same two sentences every time, sometimes the same stock photo, with only the profession swapped out. The marketer, the accountant, the lawyer, the designer, each one certain their field was the exception, all of them saying so in the identical words.',
    ),
  ),
  figure('IMAGE — collage of near-identical posts, different professions, sometimes the same stock photo.', '16 / 10'),
  prose(
    p(
      "One was from an executive, a piece of thought leadership about why she couldn't be replaced. By every obvious tell, it was written entirely by AI. The thought leader had done little of either.",
    ),
    p(
      "The easy read is that she cheated because she used a machine. But I use these tools every day, on work I'm proud to put my name on, so that isn't it. So what am I actually objecting to?",
    ),
    p(
      "A friend of mine, a writer and an editor, tells me writing is the last thing these tools can't do. Easy to file him under everyone-defends-their-own. Of course the writer defends writing. It seems exactly backwards: we send these models words, and words are mostly what they send back. Then he said it another way.",
    ),
  ),
  pullQuote('Why outsource your words? What you have to say?'),
  prose(
    p(
      'That is not a complaint about effort, or honesty, or tools. It is a claim on authorship. And it isn’t only about words. Swap in an image, a product, anything you would put your name on, and the question is the same.',
    ),
  ),

  heading('Rewind'),
  prose(
    p(
      "It's a question with a history. Authorship has never sat still. Every time the tools change, we end up asking it again: who really made this, and what did making it even mean?",
    ),
    rich(
      [
        ['In 1935, '],
        ['Walter Benjamin', 'fn1'],
        [
          " was already asking. He was writing about photography and film, the new machines that could copy a work without end. His point wasn't just that reproduction changed how art got made. It changed what it meant to author it at all.",
        ],
      ],
      [
        fn(
          'fn1',
          '"The Work of Art in the Age of Mechanical Reproduction," 1935. Full text: marxists.org',
          'https://www.marxists.org/reference/subject/philosophy/works/ge/benjamin.htm',
        ),
      ],
    ),
    p(
      'That conversation never stopped. Looking back, I can see it moving through a few distinct roles:',
    ),
    p(
      'First, the Designer as Artisan. Every mark made by hand. The skill lived in the hand, and the craft was the proof of it.',
    ),
    p(
      "Computers came around, and digital tools reached a precision the hand couldn't. Enter the Designer as Ideator. The computer could make; now it was the concept and the creativity that signaled the skill.",
    ),
    p(
      'Even before our current landscape of AI, algorithmic design and process art let a designer generate options and variations. Sampling, remixing, composition. The Designer as Curator. Taste and critique reigned.',
    ),
  ),
  figure('DIAGRAM — three named roles on a line from "hand" to "head," the drift from making to deciding.', '5 / 2'),
  prose(
    p(
      'Notice what actually moved. Each shift changed what the designer does, and what we call skill, pushing the work further from the making and deeper into the deciding.',
    ),
    p('The job changed every time. The skills changed every time. Did the author?'),
  ),

  breakBlock('After the three roles, before the craft/effort argument.'),
  prose(
    p(
      'Every craft rewards effort and slowness: the meticulously handmade, the maker who did it the hard way. Struggle reads as sincerity, handmade reads as honest, and efficient reads as cheap.',
    ),
    p(
      "I see this firsthand with woodworking. There's a whole discourse around CNC machines (basically a robot: you draw the part, it cuts it). It's cheating. It's not real woodworking. The piece doesn't count because a computer cut it.",
    ),
    p(
      "But where do you draw a line? Is ripping a board with a handsaw more pure when a table saw can do it in seconds? Is a powered router cheating when the old artisans used chisels? I don't know where that threshold is. Each generation draws the line just past the tools it grew up with, and the next generation moves it.",
    ),
    p(
      "Under that discourse is a real question: is there value in doing something the slow way when a 'better' way exists? For the person, maybe. Hand-cutting a joint is a fine way to spend an afternoon. But that value belongs to the maker, not the work. The joint doesn't hold better because it took all afternoon.",
    ),
    p(
      "We've run this panic before, with the same machine Benjamin was writing about. Before the camera raised his question, it stood accused of cheating: a trick, a machine doing what art was supposed to do, the end of painting. It wasn't. Every tool panic mistakes the tool for the question. Painting walked away from likeness and went looking for what only paint could do, and photography became an art with masters of its own.",
    ),
  ),

  breakBlock('Before the Barthes turn.'),
  prose(
    p(
      "How a thing was made can't be the test of quality, so judge the work by what it is. The end object has to stand.",
    ),
    rich(
      [
        ['In 1967, Roland Barthes wrote '],
        ['The Death of the Author', 'em', 'fn2'],
        [
          ", arguing against this same romanticization of the author's biography. Meaning doesn't live in the maker's intentions, waiting to be decoded. It happens in the person reading, looking, using. The maker's story, their process, their suffering over the thing: none of it inherently gets a vote.",
        ],
      ],
      [
        fn(
          'fn2',
          'First published in English in Aspen no. 5+6, the "magazine in a box." Still readable there: ubu.com',
          'https://www.ubu.com/aspen/aspen5and6/threeEssays.html',
        ),
      ],
    ),
    p(
      "But this rules out less than it sounds like. What goes is the exertion: the hours, the sore hands, the doing it the hard way. What stays is the deciding. The effort leaves no trace in the finished piece. The choices are the piece: what it's made of, what was left off, who it's for. The sweat was never evidence. The decisions still are.",
    ),
  ),

  heading('What an Author Is'),
  prose(
    p(
      "If the maker's story doesn't count and the tools don't either, who's left standing behind the work? For decades that was an academic question. Now anyone can generate a passable anything in thirty seconds, and if no hands made it, who answers for it? This is the point where AI stops feeling like a sharper tool and starts feeling like something else entirely.",
    ),
    rich(
      [
        ['Two years after Barthes, Michel Foucault asked '],
        ['What Is an Author?', 'em', 'fn3'],
        [
          ' and gave back a different author than the one Barthes buried. Not the person, but a function: a constructed thing, assembled around the work rather than found behind it.',
        ],
      ],
      [
        fn(
          'fn3',
          'A lecture before it was an essay, 1969. Full text: monoskop.org',
          'https://monoskop.org/File:Foucault_Michel_1969_1977_What_Is_an_Author.pdf',
        ),
      ],
    ),
    p(
      'Here is my definition. Authorship is designation: deciding what the work is, what it says, what stays and what goes. It survives delegation, because the hands alone were never what made someone the author. And it carries the accountability, because the name on the work is the name that answers for it.',
    ),
  ),

  heading('Taking It Apart'),
  prose(
    p(
      "If authorship is designation, then the work should carry the evidence. The quickest way to see it is where it's gone missing.",
    ),
  ),
  figure('IMAGE — pendulum painting mid-pour: the can on a string, the loops accumulating.', '3 / 2'),
  prose(
    p(
      "Maybe you've seen these. It's hard to spend any time on the internet without one crossing your feed: a can of paint swinging from a string, looping over a canvas until the loops become a picture. There are tutorials for making them, whole subreddits for sharing them, hundreds of canvases that are all the same painting. They drive me a little crazy.",
    ),
    p(
      "That's a strong reaction to something so harmless, so it's worth asking what it's about. The idea underneath them was a real one once. Pollock took the brush off the canvas and let the paint fall, and the falling was part of the painting. Morris Louis poured and tilted and let gravity do the drawing. In those works the process isn't a story behind the object. It's in the object, part of what you're looking at. Handing the mark to a force outside your hand was the designation: a decision about control, about what a painting even had to be. Through those decisions the process is designated into the art object itself.",
    ),
  ),
  flow(3, 'Pollock at work · Morris Louis pour · the five-hundredth pendulum canvas.', '3 / 2'),
  prose(
    p(
      "The five hundredth pendulum painting contains none of it. Not because gravity stopped being interesting, but because the deciding is used up. The tutorial made the decisions. The rig came with them. What's left to designate is a color scheme. The first swing of the can was a claim; the rest inherit it and add nothing. That's what actually grates. Not the paint. The absence of anyone deciding anything.",
    ),
    p(
      "And still, some of them are pretty. Every so often one catches me. Whatever I feel in front of it is a fact about the canvas, there to be judged like any other. Whether anyone authored it was settled before the string ever swung. Those are two different questions with two different answers, and the pendulum painting is proof they come apart: the process couldn't be more visible, and the authorship couldn't be thinner.",
    ),
  ),
  flow(2, 'Braun product under Rams · the "Designed by Apple in California" box.', '4 / 3'),
  prose(
    rich([
      [
        "Origin can still fit in the picture. It has to be designated in, like everything else, and design does this at the scale of the company. Braun under Rams built an author into the objects, rule by rule. You can read the restraint on every dial and grille, and the name it made famous was Braun's, not his. Most people who owned the products never knew who designed them. What they saw was the constructed author that was Braun, and the design philosophy behind it. Apple makes the same claim today, printing ",
      ],
      ['Designed by Apple in California', 'em'],
      [
        ' on every box. Turn it around and you get the licensed signature on a product the designer never touched, where the name is doing work the object can’t. Things break down when the origin is invoked purely as a selling point, or the process is fetishized. Designated in, origin and process are part of the work, and you judge them with the rest of it.',
      ],
    ]),
  ),

  breakBlock('Before the Rubens workshop passage.'),
  prose(
    rich(
      [
        [
          'When we think of "real artists" we look to the classical painters: one virtuoso, sequestered away, producing a masterpiece at a time. Even this story is mostly myth. Raphael, Titian, and Rembrandt all ran workshops that ran on other people’s hands. Rubens is a very clear example. His Antwerp workshop turned out paintings by the hundred: apprentices blocking in figures from his oil sketches, specialists brought in for what they did best, ',
        ],
        ['Snyders for the animals, Brueghel for the flowers', 'fn4'],
        [
          '. Rubens picked the subjects. He set the style the whole room painted in. He walked the floor correcting, and repainted the passages that mattered. When a painting left, it left as a Rubens, and the buyers who knew all this wanted a Rubens anyway.',
        ],
      ],
      [
        fn(
          'fn4',
          'Rubens put the arrangement in writing himself. In a 1618 letter offering paintings to a buyer he lists what each hand did: "Prometheus Bound… original by my hand, the eagle done by Snyders." The Getty gave the Brueghel partnership a whole catalogue.',
          'https://www.getty.edu/publications/virtuallibrary/0892368489.html',
        ),
      ],
    ),
  ),
  figure('IMAGE — Rubens workshop painting, or a plan of the Antwerp studio: many hands, one name.', '3 / 2'),
  prose(
    p(
      'We talked about the chisel, the table saw, and the CNC, but the ladder keeps going. The assistant, the workshop, and the agency are all extensions of our ability. You can’t put a definitional limit on delegation any more than you could on the tools, but it does feel murkier, because people aren’t chisels. Collaborators decide things and bring their own outlooks. The structural engineer makes calls the architect couldn’t make. The director works with a cinematographer to decide how the whole film will look, and the cinematographer delegates in turn, handing the camera to an operator and the lights to a gaffer. "Delegate the work but keep the decisions" sounds clean, but decision making gets shared too. When it is, the lack of control starts to look like a threat to authorship.',
    ),
    p(
      "At a certain scale, delegation isn't a compromise; it's the only way the work can exist. The building is still the architect's, engineers and all. Authorship is not just a share of the tasks or a count of the decisions. It's a position: the frame every other decision happens inside, and the yes or no each one has to pass. That's what Rubens was doing walking the floor. That is the act of designation.",
    ),
    p(
      "None of this erases the hands of collaborators. Rubens' assistants were known and paid. Credit is real, and it spreads to everyone who made the thing better. Van Dyck walked out of that workshop with plenty of it.",
    ),
  ),
  flow(2, 'Judd stack fabricated by Bernstein Brothers · LeWitt wall drawing instructions beside an installed wall.', '4 / 3'),
  prose(
    rich(
      [
        ['The position doesn’t dictate a grip, either. Donald Judd sent drawings to '],
        ['Bernstein Brothers', 'fn5'],
        [
          ', a metal shop in Queens, and never touched the steel. His drawings fixed the exact dimensions and the exact finishes, and he kept control of everything but the fabricating. Sol LeWitt wrote instructions for wall drawings and ',
        ],
        ['welcomed what different hands did', 'fn6'],
        [
          ' with them. The drift between installations was part of the work as far as he was concerned. One gripped tighter than any hand-maker; one let go on purpose. Both fully embody authorship. Letting go of control was never letting go of the designating.',
        ],
      ],
      [
        fn(
          'fn5',
          'Bernstein Brothers Sheet Metal Specialties, Long Island City. Judd worked with the shop for most of his life; the Guggenheim’s conservation notes document the arrangement piece by piece.',
          'https://www.guggenheim.org/conservation/the-panza-collection-initiative/donald-judd',
        ),
        fn(
          'fn6',
          'In his own words: "Each person draws a line differently and each person understands words differently." From "Doing Wall Drawings," 1971 — context at Tate Papers.',
          'https://www.tate.org.uk/research/tate-papers/14/ideas-in-transmission-lewitt-wall-drawings-and-the-question-of-medium',
        ),
      ],
    ),
  ),

  breakBlock('Before the accountability passage.'),
  prose(
    p(
      'Accountability is the last piece of authorship, and it has been there since the birth of the whole idea. Words started getting named authors when words could get their writers in trouble. A sermon that crossed the church, a pamphlet that upset the crown: you couldn’t punish an utterance itself, so it had to be attached to a person. Later came the prestige and the idea of an opus. Authorship began as liability, and being answerable for the work still defines it today.',
    ),
  ),
  figure('IMAGE — seditious pamphlet title page, 17th century: the printed name as the liability.', '3 / 2'),
  prose(
    p(
      "When a politician is caught plagiarizing a speech, we blame the politician. We don't hear much talk about the speechwriter. The speaker owns the words they put out into the world, even when they didn't pen them. Putting their name on it inherits the accountability. And the reverse holds too with the iconic speeches we praise. The author's name marks ownership, not credit for the labor.",
    ),
    p(
      "And it holds even where the stakes feel highest. A eulogy seems like the one thing you could never outsource, but we borrow those words all the time: the Hallmark card, the poem read at the grave, the pastor working from the family's notes. Nobody calls that cheating. Cheating is a eulogy full of stories that never happened, bypassing the act of remembering and deciding what was worth saying.",
    ),
    p(
      "Today it's easier than ever to make something and put it out into the world, and the evolution of our tools doesn't excuse us from the responsibility. The work that carries your name is yours to answer for. You can't dodge the ownership while claiming the authorship.",
    ),
  ),

  heading('Now'),
  prose(
    p(
      "It feels like AI should break all of this. Every shift before it moved the author along the same line, further from the making and deeper into the deciding. It's easy for this one to feel like it abolishes the line altogether. Type a prompt and finished work comes back. This one doesn't feel like a better tool. It feels like a different shape.",
    ),
  ),
  figure('IMAGE — the mug and the straw: same shape by the rules that matter.', '4 / 3'),
  prose(
    p(
      "Topology is the branch of mathematics that asks what a shape really is once you're allowed to stretch it, bend it, squash it, and pull it like taffy. The only moves forbidden are tearing a new hole and sealing one up. Whatever survives all that handling is the shape's true structure. Within those rules, a coffee mug and a drinking straw are the same shape. Each has exactly one hole, the mug's through its handle, the straw's down the middle, and with enough patience you could squish one into the other. I think authorship works the same way. It's a squishy concept, but the structure survives the stretching. AI looks nothing like a chisel, an apprentice, or a workshop full of specialists. But within the rules of authorship, it's the same shape: another executor, the next rung on a ladder of tools and collaboration.",
    ),
    p(
      "Yes, the model makes choices. So did the cinematographer, and the film was no less the director's. And yes, it builds on what it ingested. So do we. The writer builds from every book she's read, and the songwriter is reacting to every song he's ever heard. AI does the same thing cranked to eleven. Pushed far enough, a difference in degree can become a difference in kind. The question is where the difference lands. For authorship, nothing moved. Just as there was no line in the tools and no line in the delegation, there isn't one here. Authorship isn't an amount of anything. It's a position. However much the model ingests, the work still happens inside someone's frame, and someone still decides what goes out under their name.",
    ),
    rich(
      [
        [
          "But there's a real difference here, and it isn't about authorship. Everyone in the old chain agreed to be in it. The assistant took the job, the session player showed up, the photographer licensed the shot. The books and images a model trains on didn't. That says nothing about who authored the result. It's about how the material was gathered. Consent to be read was never consent to train a machine. A bill left unpaid never changed who made the work, and this is no different. You can author it completely, and the tool under it ",
        ],
        ['may still carry a debt', 'fn7'],
        [', owed to everyone it learned from without asking.'],
      ],
      [
        fn(
          'fn7',
          'The provenance question deserves more than a paragraph. Thomas Mallon’s Stolen Words gives us a lens with which to view the changing landscape.',
        ),
      ],
    ),
    p(
      "The old lines still hold. Reference, fair use, and plagiarism divide where they always did. What's changed is that you can cross into plagiarism without knowing, because you never saw the source. The model did. And when the deciding thins to almost nothing and the work is a near-copy of a single source, that's where authorship gives out. No frame of your own is left, only someone else's.",
    ),
    p(
      "Unlike other collaborators, AI can't stand behind anything it makes. It has no stake in being wrong and nothing to lose by it. Ask it to answer for the work and you get more output. The accountability is concentrated in the author, not diluted by AI.",
    ),
    p(
      'Despite the rules of topology, drinking from a mug is nothing like drinking through a straw. The experience is entirely different, and of course our experience of AI is different too. But the experience changed, not the authorship. What changed is how cheap the handoff has become. The deciding used to be hard to give away. You had to build a workshop first. Now it’s one prompt away.',
    ),
  ),

  heading('Direction'),
  prose(
    p(
      "The whole history of tools is the history of them getting cheaper and more accessible, letting a wider group of people make more things. Mostly, that's been good. But the same engine that can extend someone's authorship will just as happily hollow it out. As the tools democratize, and the handoff economics shift, giving up the designation gets easier, and more tempting, than it has ever been.",
    ),
    p(
      "Polish used to mean something. It couldn't prove authorship, but it didn't happen by accident either: a finished surface meant someone cared enough to get it there. Now the finish is the default. The work comes back polished whether anything was decided or not, and the surface stopped recording the difference. A polished post can hide that nothing was decided. A LinkedIn feed of ten thousand of them, the same argument in the same words, gives it away. And when the sameness shows, the abdication is double. Nobody decided what to say, and nobody cared how it was said. The position sat empty the whole way through.",
    ),
    p(
      "The variable was never the tool. It's how much of the designation you keep. Abdication sits at one end, direction at the other, and every use of these tools lands somewhere between them. None of this needed AI. Low designation has always been weak authorship, in any medium, whichever hands or machines did the making. The clichés an intern typed up under someone else's name were an abdication before any model existed.",
    ),
  ),

  breakBlock('Before the Designer as Director naming.'),
  prose(
    p(
      'Every time the tools moved, the archetype of a designer changed. The hand made the Artisan, the computer made the Ideator, and generated options made the Curator. The tools have moved again, and given what authorship actually is, the next name follows from it: the Designer as Director.',
    ),
  ),
  figure('IMAGE — the studio website in progress: sketches, generations, critique marked up.', '16 / 10'),
  prose(
    p(
      "Directing is not a diminished version of making. Building my studio's website, I decided the brief, how to position years of different kinds of work, and what the design language would be, down to the type scale and the baseline grid. And I collaborated on the making: I sketched layouts, let a model take a run at them, and sent generations back with critique. Where I had the expertise (the type, the grids), I went deep and prescriptive. Where I didn't, I set the direction, trusted the specialist, and reviewed what came back. Just as a creative director oversees a team of designers, I directed the whole project without doing the whole project. None of the authoring got lighter. I just got to the results quicker.",
    ),
    p(
      'Why outsource your words? You can, it turns out. The words were always the delegable part. What you have to say never was. The job changed again. The skills changed again. The author never did.',
    ),
  ),
]

const doc = {
  _id: DRAFT_ID,
  _type: 'thought',
  title: 'Embodied Authorship: Design in the Age of AI',
  subtitle:
    'Design keeps handing more of the making to machines. What happens to the author when the work is one prompt away?',
  slug: {_type: 'slug', current: 'embodied-authorship'},
  type: 'Essay',
  // Working value so the date renders in the listing and the meta line while
  // the piece is in review. Notion's Published field is still empty — set the
  // real date in both places when it actually goes out, or a re-run of this
  // script will reset it.
  publishedAt: '2026-07-31',
  seo: {
    _type: 'seo',
    metaDescription:
      'AI can make design work now. Who authors it? On delegation, accountability, and what survives when the making is one prompt away.',
    shareDescription:
      'Design keeps handing more of the making to machines. What happens to the author when the work is one prompt away?',
  },
  body,
}

client
  .createOrReplace(doc)
  .then((res) => {
    console.log('draft written:', res._id)
    console.log('body blocks:', body.length)
  })
  .catch((err) => {
    console.error('FAILED:', err.message)
    process.exit(1)
  })
