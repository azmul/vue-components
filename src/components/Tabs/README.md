## Tab Component

Displaing a Tab component following bellow Steps.

### Step 1
import **tabs** and **tab** components. Following this code.

```
import {tabs,tab} from '@/components/Tabs';
```

### Step 1
Include bellow html markup in your template section. This is an example. Modify this section according to your project requirements.

```

<tabs>
    <tab name="Pay" :selected="true">
        <p>
          Tab 1
        </p>
      </tab>
    <tab name="Delivers">
        <p>
          Tab 2
        </p>
      </tab>
    <tab name="Parcels">
        <p>
          Tab 3
        </p>
      </tab>
    <tab name="Rides">
        <p>
          Tab 4
        </p>
    </tab>
</tabs>

```
Here **tabs** component can contain unlimited **tab** which will be needed according to project. Each **tab** contains its markup.