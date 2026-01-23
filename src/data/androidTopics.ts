export interface AndroidTopic {
  id: string;
  category: string;
  title: string;
  content: string;
  keyPoints: string[];
  codeExample?: string;
  interviewTips?: string[];
}

export const androidTopics: AndroidTopic[] = [
  // Activity Lifecycle
  {
    id: 'activity-lifecycle-overview',
    category: 'Activity Lifecycle',
    title: 'Activity Lifecycle Overview',
    content: `Activities have 7 lifecycle methods that are called as the activity moves through different states. Understanding when each method is called is crucial for managing resources, saving state, and providing a smooth user experience.`,
    keyPoints: [
      'onCreate() - Activity being created, initialize UI and data',
      'onStart() - Activity becoming visible',
      'onResume() - Activity in foreground, user can interact',
      'onPause() - Another activity taking focus (still partially visible)',
      'onStop() - Activity no longer visible',
      'onDestroy() - Activity being destroyed',
      'onRestart() - Activity being restarted after being stopped',
    ],
    interviewTips: [
      'Know the difference between onPause and onStop',
      'Understand when to save state vs when to release resources',
      'Be ready to explain configuration changes',
    ],
  },
  {
    id: 'activity-oncreate',
    category: 'Activity Lifecycle',
    title: 'onCreate()',
    content: `Called when the activity is first created. This is where you should do all static setup: create views, bind data to lists, etc. This method receives a Bundle containing the activity's previously frozen state, if there was one.`,
    keyPoints: [
      'Called once when activity is created',
      'Set content view with setContentView()',
      'Initialize member variables and views',
      'Restore saved instance state if available',
      'Always call super.onCreate() first',
    ],
    codeExample: `override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    // Initialize views
    val button = findViewById<Button>(R.id.button)

    // Restore state
    savedInstanceState?.let {
        counter = it.getInt("counter", 0)
    }
}`,
  },
  {
    id: 'activity-onstart-onstop',
    category: 'Activity Lifecycle',
    title: 'onStart() / onStop()',
    content: `onStart() is called when the activity becomes visible to the user. onStop() is called when the activity is no longer visible. These are good places to register/unregister broadcast receivers or start/stop animations.`,
    keyPoints: [
      'onStart() - Activity is visible but not interactive yet',
      'onStop() - Activity is completely hidden',
      'Good for registering/unregistering BroadcastReceivers',
      'Start/stop animations or location updates here',
      'onStop may not be called if system kills process',
    ],
  },
  {
    id: 'activity-onresume-onpause',
    category: 'Activity Lifecycle',
    title: 'onResume() / onPause()',
    content: `onResume() is called when the activity will start interacting with the user. onPause() is called when the system is about to resume a previous activity. This is typically used to commit unsaved changes and stop animations.`,
    keyPoints: [
      'onResume() - Activity is in the foreground and interactive',
      'onPause() - Activity partially obscured (dialog, new activity)',
      'onPause should be quick - next activity not resumed until it returns',
      'Save data in onPause that should persist beyond current session',
      'Release exclusive resources (camera, sensors)',
    ],
    codeExample: `override fun onResume() {
    super.onResume()
    // Start camera preview
    cameraSource?.start(surfaceView.holder)
}

override fun onPause() {
    super.onPause()
    // Release camera
    cameraSource?.stop()
}`,
  },
  {
    id: 'activity-savedinstancestate',
    category: 'Activity Lifecycle',
    title: 'Saving Instance State',
    content: `When an activity may be destroyed due to configuration changes or system memory pressure, the system calls onSaveInstanceState() to allow you to save UI state. This state is restored in onCreate() or onRestoreInstanceState().`,
    keyPoints: [
      'Called before activity may be destroyed',
      'Bundle survives configuration changes',
      'NOT called when user explicitly closes activity',
      'Use for transient UI state, not persistent data',
      'Views with IDs automatically save their state',
    ],
    codeExample: `override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    outState.putInt("counter", counter)
    outState.putString("userName", editText.text.toString())
}

override fun onRestoreInstanceState(savedInstanceState: Bundle) {
    super.onRestoreInstanceState(savedInstanceState)
    counter = savedInstanceState.getInt("counter")
}`,
  },

  // Fragment Lifecycle
  {
    id: 'fragment-lifecycle',
    category: 'Fragment Lifecycle',
    title: 'Fragment Lifecycle Overview',
    content: `Fragments have their own lifecycle that is closely tied to the host activity's lifecycle. Fragments add additional callbacks like onAttach(), onCreateView(), and onDestroyView().`,
    keyPoints: [
      'onAttach() - Fragment attached to activity',
      'onCreateView() - Create and return the view hierarchy',
      'onViewCreated() - View has been created, safe to find views',
      'onDestroyView() - View being destroyed (fragment may still exist)',
      'onDetach() - Fragment detached from activity',
    ],
    codeExample: `class MyFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_my, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // Safe to access views here
        view.findViewById<Button>(R.id.button).setOnClickListener { }
    }
}`,
  },
  {
    id: 'fragment-vs-activity',
    category: 'Fragment Lifecycle',
    title: 'Fragment vs Activity Lifecycle',
    content: `Fragment lifecycle is tied to its host activity but has additional states. The key difference is that fragments can have their views destroyed while the fragment instance is kept (like during fragment transactions with back stack).`,
    keyPoints: [
      'Fragment lifecycle mirrors activity lifecycle',
      'onCreateView/onDestroyView can be called multiple times',
      'Use viewLifecycleOwner for view-related observers',
      'Fragment instance can outlive its view',
      'Handle configuration changes with setRetainInstance (deprecated)',
    ],
    interviewTips: [
      'Explain why onCreateView can be called multiple times',
      'Know the difference between fragment lifecycle and view lifecycle',
      'Understand fragment transactions and back stack',
    ],
  },

  // MVVM Architecture
  {
    id: 'mvvm-overview',
    category: 'MVVM Architecture',
    title: 'MVVM Overview',
    content: `Model-View-ViewModel is the recommended architecture pattern for Android apps. It separates UI logic from business logic, making code more testable and maintainable.`,
    keyPoints: [
      'Model - Data and business logic',
      'View - UI components (Activity, Fragment)',
      'ViewModel - UI state holder, survives configuration changes',
      'LiveData - Observable data holder, lifecycle-aware',
      'Repository pattern for data access abstraction',
    ],
  },
  {
    id: 'viewmodel-basics',
    category: 'MVVM Architecture',
    title: 'ViewModel Basics',
    content: `ViewModel is designed to store and manage UI-related data in a lifecycle-conscious way. It survives configuration changes like screen rotations, preventing data loss and unnecessary network calls.`,
    keyPoints: [
      'Survives configuration changes',
      'Scope to Activity or Fragment',
      'Do NOT hold references to Context, View, or Activity',
      'Use ViewModelProvider to create instances',
      'Cleared when Activity finished or Fragment detached permanently',
    ],
    codeExample: `class MyViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users

    fun loadUsers() {
        viewModelScope.launch {
            _users.value = repository.getUsers()
        }
    }
}

// In Activity/Fragment
val viewModel: MyViewModel by viewModels()
viewModel.users.observe(viewLifecycleOwner) { users ->
    adapter.submitList(users)
}`,
  },
  {
    id: 'livedata-basics',
    category: 'MVVM Architecture',
    title: 'LiveData',
    content: `LiveData is an observable data holder class that is lifecycle-aware. It only updates observers that are in an active lifecycle state, preventing memory leaks and crashes.`,
    keyPoints: [
      'Lifecycle-aware - only updates active observers',
      'No manual lifecycle handling needed',
      'Always delivers the latest value to new observers',
      'MutableLiveData for writable, LiveData for read-only',
      'Use Transformations.map/switchMap for derived data',
    ],
    codeExample: `// In ViewModel
private val _count = MutableLiveData(0)
val count: LiveData<Int> = _count

val countText: LiveData<String> = count.map { "Count: $it" }

fun increment() {
    _count.value = (_count.value ?: 0) + 1
}`,
  },

  // RecyclerView
  {
    id: 'recyclerview-basics',
    category: 'RecyclerView',
    title: 'RecyclerView Basics',
    content: `RecyclerView is a flexible view for providing a limited window into a large data set. It recycles views that are no longer visible to improve performance.`,
    keyPoints: [
      'More flexible than ListView',
      'Requires LayoutManager for positioning',
      'Uses ViewHolder pattern for efficiency',
      'Adapter bridges data and views',
      'ItemDecoration for dividers, spacing',
    ],
  },
  {
    id: 'recyclerview-viewholder',
    category: 'RecyclerView',
    title: 'ViewHolder Pattern',
    content: `ViewHolder holds references to views to avoid expensive findViewById() calls. Each recycled view reuses its ViewHolder, only updating the data.`,
    keyPoints: [
      'Stores view references for reuse',
      'Created in onCreateViewHolder()',
      'Bound to data in onBindViewHolder()',
      'getItemCount() returns list size',
      'Use DiffUtil for efficient updates',
    ],
    codeExample: `class UserAdapter : RecyclerView.Adapter<UserAdapter.ViewHolder>() {
    private var users = listOf<User>()

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nameText: TextView = view.findViewById(R.id.name)
        val emailText: TextView = view.findViewById(R.id.email)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_user, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val user = users[position]
        holder.nameText.text = user.name
        holder.emailText.text = user.email
    }

    override fun getItemCount() = users.size
}`,
  },
  {
    id: 'recyclerview-diffutil',
    category: 'RecyclerView',
    title: 'DiffUtil & ListAdapter',
    content: `DiffUtil calculates the difference between two lists and outputs update operations that convert the first list into the second one. ListAdapter is a convenient wrapper that handles this automatically.`,
    keyPoints: [
      'Calculates minimal updates between lists',
      'Runs on background thread with AsyncListDiffer',
      'ListAdapter simplifies implementation',
      'Implement areItemsTheSame and areContentsTheSame',
      'Much more efficient than notifyDataSetChanged()',
    ],
    codeExample: `class UserAdapter : ListAdapter<User, UserAdapter.ViewHolder>(UserDiffCallback()) {
    // ViewHolder and onCreateViewHolder same as before

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}

class UserDiffCallback : DiffUtil.ItemCallback<User>() {
    override fun areItemsTheSame(oldItem: User, newItem: User) =
        oldItem.id == newItem.id

    override fun areContentsTheSame(oldItem: User, newItem: User) =
        oldItem == newItem
}

// Usage
adapter.submitList(newList)`,
  },

  // Coroutines
  {
    id: 'coroutines-basics',
    category: 'Coroutines',
    title: 'Coroutines Basics',
    content: `Kotlin Coroutines provide a way to write asynchronous, non-blocking code in a sequential manner. They are lightweight threads that can suspend execution without blocking.`,
    keyPoints: [
      'Lightweight - thousands of coroutines on single thread',
      'suspend functions can pause and resume',
      'No callback hell - sequential code style',
      'Structured concurrency with scopes',
      'Built-in cancellation support',
    ],
    codeExample: `// Suspend function
suspend fun fetchUser(): User {
    return withContext(Dispatchers.IO) {
        api.getUser() // Network call
    }
}

// Launch coroutine
lifecycleScope.launch {
    try {
        val user = fetchUser()
        textView.text = user.name
    } catch (e: Exception) {
        showError(e.message)
    }
}`,
  },
  {
    id: 'coroutines-dispatchers',
    category: 'Coroutines',
    title: 'Dispatchers',
    content: `Dispatchers determine what thread the coroutine runs on. Using the right dispatcher is crucial for performance and avoiding blocking the main thread.`,
    keyPoints: [
      'Dispatchers.Main - UI operations on Android',
      'Dispatchers.IO - Network, database, file I/O',
      'Dispatchers.Default - CPU-intensive work',
      'Dispatchers.Unconfined - Starts in caller thread',
      'Use withContext() to switch dispatchers',
    ],
    codeExample: `viewModelScope.launch(Dispatchers.Main) {
    showLoading()

    val data = withContext(Dispatchers.IO) {
        repository.fetchData() // Runs on IO thread
    }

    val processed = withContext(Dispatchers.Default) {
        processData(data) // CPU-intensive on Default
    }

    displayData(processed) // Back on Main
    hideLoading()
}`,
  },
  {
    id: 'coroutines-scopes',
    category: 'Coroutines',
    title: 'Coroutine Scopes',
    content: `Coroutine scopes define the lifecycle of coroutines. When a scope is cancelled, all coroutines within it are cancelled. Android provides built-in scopes tied to component lifecycles.`,
    keyPoints: [
      'viewModelScope - tied to ViewModel lifecycle',
      'lifecycleScope - tied to Lifecycle (Activity/Fragment)',
      'GlobalScope - application-wide (use sparingly)',
      'Cancellation propagates to child coroutines',
      'Use supervisorScope for independent children',
    ],
    interviewTips: [
      'Explain why GlobalScope is generally discouraged',
      'Know how to handle errors in coroutine hierarchies',
      'Understand structured concurrency',
    ],
  },

  // Security
  {
    id: 'android-permissions',
    category: 'Security',
    title: 'Runtime Permissions',
    content: `Starting from Android 6.0 (API 23), dangerous permissions must be requested at runtime. The app must explain why the permission is needed and handle denial gracefully.`,
    keyPoints: [
      'Normal permissions granted at install time',
      'Dangerous permissions require runtime request',
      'Check permission before using feature',
      'Handle "Don\'t ask again" case',
      'Use ActivityResultContracts for cleaner code',
    ],
    codeExample: `private val requestPermission = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted ->
    if (isGranted) {
        // Permission granted
        startCamera()
    } else {
        // Permission denied
        showPermissionRationale()
    }
}

fun checkCameraPermission() {
    when {
        ContextCompat.checkSelfPermission(
            this, Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED -> {
            startCamera()
        }
        shouldShowRequestPermissionRationale(Manifest.permission.CAMERA) -> {
            showRationaleDialog()
        }
        else -> {
            requestPermission.launch(Manifest.permission.CAMERA)
        }
    }
}`,
  },
  {
    id: 'android-proguard',
    category: 'Security',
    title: 'ProGuard/R8',
    content: `ProGuard (and its replacement R8) shrinks, optimizes, and obfuscates code. It removes unused code and renames classes/methods to make reverse engineering harder.`,
    keyPoints: [
      'Shrinking - removes unused code',
      'Optimization - optimizes bytecode',
      'Obfuscation - renames classes and methods',
      'Keep rules for reflection, serialization',
      'Enabled by default in release builds',
    ],
    codeExample: `// build.gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'),
            'proguard-rules.pro'
    }
}

// proguard-rules.pro
-keep class com.example.api.** { *; }
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
}`,
  },
  {
    id: 'android-encryption',
    category: 'Security',
    title: 'Data Encryption',
    content: `Sensitive data should be encrypted both at rest and in transit. Android provides EncryptedSharedPreferences and EncryptedFile for secure storage.`,
    keyPoints: [
      'Use HTTPS for all network communication',
      'EncryptedSharedPreferences for sensitive preferences',
      'Android Keystore for cryptographic keys',
      'Don\'t store sensitive data in plain SharedPreferences',
      'Use network security config for certificate pinning',
    ],
    codeExample: `// EncryptedSharedPreferences
val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val sharedPreferences = EncryptedSharedPreferences.create(
    context,
    "secret_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)

sharedPreferences.edit()
    .putString("auth_token", token)
    .apply()`,
  },
];

export const androidCategories = [
  'Activity Lifecycle',
  'Fragment Lifecycle',
  'MVVM Architecture',
  'RecyclerView',
  'Coroutines',
  'Security',
] as const;

export type AndroidCategory = (typeof androidCategories)[number];

export function getTopicsByCategory(category: AndroidCategory): AndroidTopic[] {
  return androidTopics.filter((t) => t.category === category);
}

export function getTopicById(id: string): AndroidTopic | undefined {
  return androidTopics.find((t) => t.id === id);
}
